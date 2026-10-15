# Website form SMTP

`POST /api/contact`, `/api/rfq` (including Parts quick enquiries), `/api/aog`, and `/api/careers` all use `lib/server/form-mail.ts` to send through Nodemailer using the server's existing SMTP environment. They run in the Node.js runtime. Success requires SMTP acceptance, with no logging-only fallback.

Every form uses the same recipient, authenticated sender, reply-to behavior, TLS settings, and attachment checks. AOG submissions use the exact subject `AOG Enquiry`. Contact submissions whose inquiry type is `AOG` use that subject too. Other submissions use `New website enquiry from {name}`. All validated fields, including nested RFQ details, appear in the plain-text body. RFQ and AOG reference numbers are included in both the email and API success response, preserving the existing confirmation pages.

Required server-only environment variables:

- `SMTP_HOST`
- `SMTP_PORT`: integer from 1 to 65535
- `SMTP_SECURE`: exactly `true` for implicit TLS or `false` for required STARTTLS
- `SMTP_USER`: authenticated sender mailbox
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`: recipient mailbox

Configure these in the existing server process environment. Do not commit credentials or prefix these names with `NEXT_PUBLIC_`. Missing or invalid configuration returns a generic 500 response. SMTP acceptance is required for a success response; this does not guarantee final inbox placement.

The Contact endpoint accepts JSON containing `name`, `email`, and `message`. Name and message are trimmed and required, with maximum lengths of 100 and 5000; email is validated and limited to 254 characters. Company, phone, subject, and inquiry type remain visible as optional fields and are included in the email when provided. Other forms retain their respective required fields. All routes validate the existing `website` honeypot, which must remain empty. RFQ multipart submissions supply nested details as `detailsJson`; malformed JSON is rejected.

Contact uses multipart data when an attachment is selected; the other forms use multipart data by default. All routes also accept JSON. The attachment field is `attachment`, except Careers which uses `cv`. Attachments retain the existing 10 MB limit and allowed document extensions; the handler checks the reported MIME type too. They are sent from memory and never written to public files or retained in local submission logs. Extension/MIME checks are not malware scanning.

Requests return `{ success, message }`: 200 after SMTP acceptance, 400 for invalid data (including malformed bodies and invalid attachments), or 500 for configuration/delivery failures. No internal error details are returned. The authenticated mailbox is always `from`; the visitor's validated address is `replyTo`.

All forms prevent concurrent submissions, disable the send button while sending, and retain entries after failure. Contact clears all fields and attachment state after success. RFQ/AOG retain their confirmation page redirects; Careers retains its success panel. Existing design and animations are retained.

## Verification

Use the Node version required by `package.json`, then run:

```sh
npm ci
npm run test:contact
npm run build
```

The route tests mock SMTP and do not send mail. They cover all four routes, valid delivery, AOG subjects, RFQ details, Careers CVs, input limits, malformed JSON, honeypot rejection, configuration errors, SMTP failures, recipient rejection, attachments, and STARTTLS. Production builds need network access for the existing Google Fonts setup.

After deployment, submit a controlled enquiry through each form, check the configured recipient inbox, and verify Reply addresses the visitor. Include an allowed attachment, an RFQ with nested details, and a Careers CV. Confirm AOG has the exact subject `AOG Enquiry`. This final delivery check must use the actual VPS environment; it cannot be established by local mocked tests. Do not expose credentials in screenshots or logs.

All routes require the same six variables in the running Next.js process. Missing/invalid configuration logs variable names only, without values, and returns a generic 500. Configure the deployed process environment and restart after updating it. This change does not configure NGINX, PM2, DNS, Zoho, or the VPS.
