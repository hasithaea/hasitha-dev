import SectionHeading from "@/components/SectionHeading";
import CertificationCard from "@/components/sections/CertificationCard";
import { certifications } from "@/data/certifications";

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
    </section>
  );
}