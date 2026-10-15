import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const loadDependency = createRequire(import.meta.url);
const testDirectory = path.dirname(fileURLToPath(import.meta.url));

function compile(file, imports, globals = {}) {
  const source = ts.transpileModule(readFileSync(path.join(testDirectory, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports, require: (id) => imports[id] ?? loadDependency(id),
    Request, Response, File, Buffer, console: { error() {} }, ...globals,
  }, { filename: file });
  return exports;
}

function setup({ env = {}, fail = false, accepted = true } = {}) {
  const calls = [];
  let transportOptions;
  let closed = false;
  const schema = compile('lib/validation/schemas.ts', {});
  const route = compile('app/api/contact/route.ts', {
    '@/lib/validation/schemas': schema,
    nodemailer: { createTransport(options) {
      transportOptions = options;
      return {
        async sendMail(mail) {
          calls.push(mail);
          if (fail) throw new Error('PRIVATE SMTP DETAIL');
          return { accepted: accepted ? ['team@example.com'] : [], rejected: accepted ? [] : ['team@example.com'] };
        },
        close() { closed = true; },
      };
    } },
  }, { process: { env: {
    SMTP_HOST: 'smtp.example.com', SMTP_PORT: '465', SMTP_SECURE: 'true',
    SMTP_USER: 'sender@example.com', SMTP_PASS: 'test-only', CONTACT_TO_EMAIL: 'team@example.com', ...env,
  } } });
  return { post: route.POST, calls, options: () => transportOptions, closed: () => closed };
}
const valid = { name: '  Jane  ', email: 'jane@example.com', message: '  Hello  ' };
const request = (body) => new Request('http://localhost/api/contact', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});

test('sends trimmed JSON fields using authenticated sender and visitor reply-to', async () => {
  const api = setup();
  const response = await api.post(request(valid));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.equal(api.calls[0].from.address, 'sender@example.com');
  assert.equal(api.calls[0].replyTo.address, valid.email);
  assert.equal(api.calls[0].subject, 'New website enquiry from Jane');
  assert.match(api.calls[0].text, /Message:\nHello$/);
  assert.equal(api.options().secure, true);
  assert.equal(api.closed(), true);
});

test('rejects invalid, blank, oversized and honeypot values without sending', async () => {
  for (const body of [null, {}, { ...valid, name: ' ' }, { ...valid, email: 'invalid' },
    { ...valid, message: '' }, { ...valid, name: 'x'.repeat(101) },
    { ...valid, message: 'x'.repeat(5001) }, { ...valid, website: 'spam' }]) {
    const api = setup();
    const response = await api.post(request(body));
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { success: false, message: 'Invalid form data' });
    assert.equal(api.calls.length, 0);
  }
});

test('malformed JSON and oversized streamed bodies return 400', async () => {
  for (const body of ['{', 'x'.repeat(65537)]) {
    const api = setup();
    const response = await api.post(new Request('http://localhost/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
    }));
    assert.equal(response.status, 400);
    assert.equal(api.calls.length, 0);
  }
});

test('missing or invalid configuration fails generically without sending', async () => {
  for (const env of [{ SMTP_PASS: '' }, { SMTP_PORT: 'NaN' }, { SMTP_PORT: '0' }, { SMTP_SECURE: '' }]) {
    const api = setup({ env });
    const response = await api.post(request(valid));
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { success: false, message: 'Unable to send message' });
    assert.equal(api.calls.length, 0);
  }
});

test('SMTP rejection and exceptions never report success or expose details', async () => {
  for (const options of [{ fail: true }, { accepted: false }]) {
    const api = setup(options);
    const response = await api.post(request(valid));
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { success: false, message: 'Unable to send message' });
    assert.equal(api.closed(), true);
  }
});

test('preserves optional fields and delivers valid attachments in memory', async () => {
  const api = setup();
  const form = new FormData();
  for (const [key, value] of Object.entries({ ...valid, company: 'Example', inquiryType: '' })) form.set(key, value);
  form.set('attachment', new File(['attachment contents'], 'details.txt', { type: 'text/plain' }));
  const response = await api.post(new Request('http://localhost/api/contact', { method: 'POST', body: form }));
  assert.equal(response.status, 200);
  assert.match(api.calls[0].text, /Company: Example/);
  assert.equal(api.calls[0].attachments[0].content.toString(), 'attachment contents');
});

test('rejects unsupported attachment extensions and mismatched MIME types', async () => {
  for (const [name, type] of [['script.exe', 'application/octet-stream'], ['details.pdf', 'text/html']]) {
    const api = setup();
    const form = new FormData();
    for (const [key, value] of Object.entries(valid)) form.set(key, value);
    form.set('attachment', new File(['test'], name, { type }));
    const response = await api.post(new Request('http://localhost/api/contact', { method: 'POST', body: form }));
    assert.equal(response.status, 400);
    assert.equal(api.calls.length, 0);
  }
});

test('STARTTLS is required when implicit TLS is disabled', async () => {
  const api = setup({ env: { SMTP_PORT: '587', SMTP_SECURE: 'false' } });
  await api.post(request(valid));
  assert.equal(api.options().secure, false);
  assert.equal(api.options().requireTLS, true);
});

