# Contact form SMTP

`POST /api/contact` sends contact enquiries through Nodemailer using the server's existing SMTP environment. It runs in the Node.js runtime and does not use the local submission log as a delivery fallback.

Required server-only environment variables:

- `SMTP_HOST`
- `SMTP_PORT`: integer from 1 to 65535
- `SMTP_SECURE`: exactly `true` for implicit TLS or `false` for required STARTTLS
- `SMTP_USER`: authenticated sender mailbox
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`: recipient mailbox

Configure these in the existing server process environment. Do not commit credentials or prefix these names with `NEXT_PUBLIC_`. Missing or invalid configuration returns a generic 500 response. SMTP acceptance is required for a success response; this does not guarantee final inbox placement.

The endpoint accepts JSON containing `name`, `email`, and `message`. Name and message are trimmed and required, with maximum lengths of 100 and 5000; email is validated and limited to 254 characters. Company, phone, subject, and inquiry type remain visible as optional fields and are included in the email when provided. The existing `website` honeypot must remain empty.

The form uses multipart data only when an attachment is selected. Attachments retain the existing 10 MB limit and allowed document extensions; the route checks the reported MIME type too. They are sent from memory and never written to public files or retained in local submission logs. Extension/MIME checks are not malware scanning.

Requests return `{ success, message }`: 200 after SMTP acceptance, 400 for invalid data (including malformed bodies and invalid attachments), or 500 for configuration/delivery failures. No internal error details are returned. The authenticated mailbox is always `from`; the visitor's validated address is `replyTo`.

The form prevents concurrent submissions, disables fields while sending, retains entries after failure, and clears all fields and attachment state only after success. Existing design and animations are retained.

## Verification

Use the Node version required by `package.json`, then run:

```sh
npm ci
npm run test:contact
npm run build
```

The route tests mock SMTP and do not send mail. They cover valid delivery, input limits, malformed JSON, honeypot rejection, configuration errors, SMTP failures, recipient rejection, attachments, and STARTTLS. Production builds need network access for the existing Google Fonts setup.

After deployment, submit one controlled enquiry on `/contact`, check the configured recipient inbox, and verify Reply addresses the visitor. Also check a submission with an allowed attachment. This final delivery check must use the actual VPS environment; it cannot be established by local mocked tests. Do not expose credentials in screenshots or logs.

This change does not configure NGINX, PM2, DNS, Zoho, or the VPS, and does not change the RFQ, AOG, or careers delivery handlers.
