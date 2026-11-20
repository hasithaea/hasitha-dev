import SectionHeading from "@/components/SectionHeading";
import CertificationCard from "@/components/sections/CertificationCard";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { certifications } from "@/data/certifications";

export default function Certifications() {
  const featured = certifications.filter((c) => c.featured);

  return (
    <section id="certifications" className="scroll-mt-24 py-14 border-t border-border-color">
      <SectionHeading>Certifications</SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((certification, i) => (
          <Reveal key={certification.name} delay={(i % 2) * 120} className="h-full">
            <CertificationCard certification={certification} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={240} className="mt-4 sm:text-right">
        <Button href="/certifications" variant="link">
          View all certifications
        </Button>
      </Reveal>
    </section>
  );
}