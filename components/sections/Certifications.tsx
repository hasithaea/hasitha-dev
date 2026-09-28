import SectionHeading from "@/components/SectionHeading";
import CertificationCard from "@/components/sections/CertificationCard";
import { certifications } from "@/data/certifications";
import { additionalLearning } from "@/data/additional-learning";

export default function Certifications() {
  const featured = certifications.filter((c) => c.featured);

  return (
    <section id="certifications" className="scroll-mt-24 py-14 border-t border-border-color">
      <SectionHeading>Certifications</SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((certification) => (
          <CertificationCard key={certification.name} certification={certification} />
        ))}
      </div>

      {additionalLearning.length > 0 && (
        <div className="mt-4 space-y-4">
            {additionalLearning.map((item) => (
                <article key={item.title} className="rounded-lg border border-border-color bg-bg-surface p-5">
                    <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1 text-sm text-text-muted">{item.organization}</p>
                    <p className="mt-3 max-w-2xl text-sm text-text-muted leading-relaxed">
                        {item.description}
                    </p>
                </article>
            ))}
        </div>
    )}
    </section>
  );
}