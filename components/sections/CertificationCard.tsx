import type { Certification } from "@/data/certifications";
import Button from "@/components/Button";

export default function CertificationCard({
  certification,
}: {
  certification: Certification;
}) {
  return (
    <article className="rounded-lg border border-border-color bg-bg-surface p-5">
      <h4 className="text-base font-semibold tracking-tight">
        {certification.name}
      </h4>

      <p className="mt-1 text-sm text-text-muted">{certification.issuer}</p>

      <p className="mt-3 font-mono text-xs text-text-muted">
        {certification.detail}
      </p>

      <p className="mt-3 text-sm text-text-muted leading-relaxed">
        {certification.description}
      </p>

      <Button href="/certifications#featured" variant="accent" className="mt-4">
        View details
      </Button>
    </article>
  );
}