import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import CertificateGallery from "@/components/CertificateGallery";
import Button from "@/components/Button";
import { certifications, type Certification } from "@/data/certifications";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Courses and certifications I've completed across DevOps, cloud, Python, React, APIs, and cybersecurity.",
  alternates: { canonical: "/certifications" },
};

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  const images = cert.images ?? [];
  const links = cert.links ?? [];

  return (
    <li className="flex flex-col rounded-xl border border-border-color bg-bg-surface p-5">
      {images.length > 0 && <CertificateGallery images={images} />}

      <div className={`flex-1 ${images.length > 0 ? "mt-5" : ""}`}>
        <h3 className="text-xl font-semibold tracking-tight">{cert.name}</h3>
        <p className="mt-1 text-sm text-text-muted">
          {cert.issuer} &bull; {cert.detail}
        </p>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-text-muted">
          {cert.description}
        </p>
      </div>

      {links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-border-color pt-5">
          {links.map((l) => (
            <Button key={l.url} href={l.url} variant="outline">
              {l.label}
              <ArrowUpRight />
            </Button>
          ))}
        </div>
      )}
    </li>
  );
}

export default function CertificationsPage() {
  const featured = certifications.filter((c) => c.featured);
  const others = certifications.filter((c) => !c.featured);

  return (
    <PageShell footer={<Footer />}>
      <section className="pb-24 pt-28">
        <header className="mt-8">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Certifications
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
            Courses and certifications I&apos;ve completed alongside my degree.
          </p>
        </header>

        {certifications.length === 0 ? (
          <p className="mt-16 text-text-muted">
            No certifications listed yet.
          </p>
        ) : (
          <div className="mt-16 space-y-14">
            {featured.length > 0 && (
              <div id="featured" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Featured
                </h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {featured.map((c) => (
                    <CertCard key={c.name} cert={c} />
                  ))}
                </ul>
              </div>
            )}

            {others.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Certifications &amp; courses
                </h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {others.map((c) => (
                    <CertCard key={c.name} cert={c} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>
    </PageShell>
  );
}