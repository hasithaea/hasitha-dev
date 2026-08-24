type ConfirmationEmailInput = {
  name: string;
  message: string;
};

export function buildConfirmationEmail({ name, message }: ConfirmationEmailInput) {
  const firstName = name.trim().split(" ")[0];
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const subject = "Got your message - hasitha.dev";

  const html = `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#0B1220; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0B1220; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color:#0f1829; border:1px solid #1d2c47; border-radius: 10px; overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="padding: 28px 32px 0 32px;">
                <span style="font-family: 'SF Mono', Menlo, Consolas, monospace; font-size: 14px; letter-spacing: 0.02em;">
                  <span style="color:#C9A24B;">hasitha</span><span style="color:#94A3B8;">.dev</span>
                </span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 16px 32px 8px 32px;">
                <h1 style="margin:0 0 12px 0; font-size: 20px; line-height:1.4; color:#F8FAFC; font-weight:600;">
                  Thanks, ${escapeHtml(firstName)} — got it.
                </h1>
                <p style="margin:0 0 20px 0; font-size:14px; line-height:1.6; color:#94A3B8;">
                  Your message came through. I'll read it and get back to you soon.
                </p>
              </td>
            </tr>

            <!-- Message summary card -->
            <tr>
              <td style="padding: 0 32px 24px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0B1220; border:1px solid #1d2c47; border-radius:8px;">
                  <tr>
                    <td style="padding: 16px 18px;">
                      <span style="display:block; font-family: 'SF Mono', Menlo, Consolas, monospace; font-size:11px; letter-spacing:0.06em; color:#5b6b85; text-transform:uppercase; margin-bottom:8px;">
                        What you sent
                      </span>
                      <p style="margin:0; font-size:14px; line-height:1.7; color:#d7dee8; white-space:pre-wrap;">
                        ${escapedMessage}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 0 32px 28px 32px; border-top:1px solid #1d2c47;">
                <p style="margin: 20px 0 0 0; font-size:12px; line-height:1.6; color:#5b6b85;">
                  This is an automated confirmation sent because you submitted the contact form on hasitha.dev.
                  For further questions, reach me directly at
                  <a href="mailto:hello@hasitha.dev" style="color:#C9A24B; text-decoration:none;">hello@hasitha.dev</a>.<br /><br />
                  Hasitha Amarasinghe · hasitha.dev
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();

  const text = `Thanks, ${firstName} — got it.

Your message came through. I'll read it and get back to you soon.

What you sent:
${message}

—
This is an automated confirmation sent because you submitted the contact form on hasitha.dev.
For further questions, reach me directly at hello@hasitha.dev.

Hasitha Amarasinghe · hasitha.dev`;

  return { subject, html, text };
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
