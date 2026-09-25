import PageShell from "@/components/PageShell";
import Button from "@/components/Button";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <PageShell footer={<Footer />}>
      <div className="mx-auto max-w-3xl px-6 py-24 text-text-muted">
        <h1 className="text-3xl font-semibold text-text-primary sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 font-mono text-xs tracking-wider text-text-muted/70 uppercase">
          Last updated: September 23, 2026
        </p>

        <div className="mt-12 space-y-10">
          <Section title="1. Information We Collect">
            <SubHeading>1.1 Analytics Data</SubHeading>
            <p>
              This site uses Google Analytics 4 (GA4) to understand how
              visitors use the site. Google Analytics may collect information
              such as:
            </p>
            <ul>
              <li>
                IP address (anonymized before storage; GA4 does not log or
                store full IP addresses)
              </li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>
                Pages visited, time spent on pages, and referring URLs
              </li>
              <li>
                General geographic location (city/country level, derived
                from IP)
              </li>
            </ul>
            <p>
              This data is collected using cookies and similar tracking
              technologies, and is only set after you consent (see Section
              3). For more details on how Google processes this data, see{" "}
              <Button variant="link" href="https://policies.google.com/privacy">
                Google&apos;s Privacy Policy
              </Button>{" "}
              and{" "}
              <Button variant="link" href="https://policies.google.com/technologies/partner-sites">
                how Google uses information from sites that use its services
              </Button>
              .
            </p>

            <SubHeading>1.2 Hosting Data</SubHeading>
            <p>
              This site is hosted on Vercel. Vercel may automatically log
              standard request data as part of providing hosting
              infrastructure, such as IP address, request timestamps, and
              basic device/browser information, for purposes like
              performance, security, and abuse prevention. This is separate
              from analytics cookies and occurs regardless of cookie
              consent, as it is necessary to serve the site. See{" "}
              <Button variant="link" href="https://vercel.com/legal/privacy-policy">
                Vercel&apos;s Privacy Policy
              </Button>{" "}
              for details.
            </p>

            <SubHeading>1.3 Contact Form Data</SubHeading>
            <p>
              If you use the contact form on this site, we collect the
              information you voluntarily submit, which may include:
            </p>
            <ul>
              <li>Your name</li>
              <li>Your email address</li>
              <li>The content of your message</li>
            </ul>
            <p>
              This information is used solely to respond to your inquiry and
              is not sold, rented, or shared with third parties for
              marketing purposes.
            </p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information collected to:</p>
            <ul>
              <li>
                Understand how visitors use the site and improve its content
                and performance
              </li>
              <li>Respond to messages submitted through the contact form</li>
              <li>Maintain the security and proper functioning of the site</li>
              <li>Monitor and analyze usage trends</li>
            </ul>
          </Section>

          <Section title="3. Cookies">
            <p>
              This site uses cookies set by Google Analytics to collect the
              usage data described in Section 1.1. By using this site, you
              consent to the use of these cookies. You can control or disable
              cookies at any time through your browser settings.
            </p>
            <p>
              You can also opt out of Google Analytics tracking across all
              websites by installing the{" "}
              <Button variant="link" href="https://tools.google.com/dlpage/gaoptout">
                Google Analytics Opt-out Browser Add-on
              </Button>
              .
            </p>
          </Section>

          <Section title="4. Data Sharing">
            <p>
              We do not sell your personal information. Data may be shared
              only with the service providers necessary to operate this
              site:
            </p>
            <ul>
              <li>Google Analytics (analytics)</li>
              <li>Vercel (hosting and infrastructure)</li>
            </ul>
            <p>
              These providers process data according to their own privacy
              policies and may act as independent data controllers or
              processors depending on your jurisdiction.
            </p>
          </Section>

          <Section title="5. Data Retention">
            <ul>
              <li>
                Contact form submissions are retained only as long as
                necessary to respond to and resolve your inquiry, after
                which they may be deleted.
              </li>
              <li>
                Analytics data in GA4 is retained for 14 months from
                collection, after which it is automatically deleted, per
                this site&apos;s configured retention setting.
              </li>
            </ul>
          </Section>

          <Section title="6. Your Rights">
            <p>
              Depending on your location, you may have rights regarding your
              personal data, including the right to:
            </p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>
                Withdraw consent where processing is based on consent (e.g.,
                analytics cookies)
              </li>
            </ul>
            <p>
              To exercise any of these rights, contact us using the details
              in Section 10. We will respond to verified requests within a
              reasonable timeframe, and no later than required under
              applicable law (e.g., 30 days under GDPR).
            </p>
          </Section>

          <Section title="7. Children's Privacy">
            <p>
              This site is not directed at children, and we do not knowingly
              collect personal information from anyone under the age of 16.
              If you believe a child has provided us with personal
              information, please contact us so we can delete it.
            </p>
          </Section>

          <Section title="8. International Visitors">
            <p>
              This site may be accessed from various locations worldwide. By
              using this site, you understand that your information may be
              processed by third-party services (Google Analytics, Vercel)
              that may store or process data in countries other than your
              own.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              This Privacy Policy may be updated from time to time. Changes
              will be reflected by an updated &ldquo;Last updated&rdquo;
              date at the top of this page.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              If you have questions about this Privacy Policy or wish to
              exercise your data rights, please contact:
            </p>
            <div className="mt-4">
              <Button
                variant="link"
                className="font-mono font-bold text-accent hover:text-accent-hover"
                href="mailto:hello@hasitha.dev"
              >
                hello@hasitha.dev
              </Button>
            </div>
          </Section>
        </div>
      </div>
    </PageShell>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-text-primary">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="pt-2 font-mono text-base font-semibold text-text-primary">
      {children}
    </h3>
  );
}