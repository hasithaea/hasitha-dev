import SectionHeading from "@/components/SectionHeading";
import EducationItem from "@/components/sections/EducationItem";
import CertificationCard from "@/components/sections/CertificationCard";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { additionalLearning } from "@/data/additional-learning";

export default function EducationAndCerts() {
  return (
    <section id="education" className="scroll-mt-24 py-14 border-t border-border-color">
      <SectionHeading>Education &amp; Certifications</SectionHeading>

      <div className="space-y-10">
        <div>
          <h3 className="font-mono text-xs tracking-widest text-text-muted uppercase mb-5">
            Education
          </h3>
          <div className="space-y-7">
            {education.map((item) => (
              <EducationItem key={`${item.institution}-${item.qualification}`} item={item} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-widest text-text-muted uppercase mb-5">
            Certifications &amp; Additional Learning
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((certification) => (
              <CertificationCard key={certification.name} certification={certification} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-widest text-text-muted uppercase mb-5">
            Workshops
          </h3>
          <div className="space-y-4">
            {additionalLearning.map((item) => (
              <article key={item.title} className="rounded-lg border border-border-color bg-bg-surface p-5">
                <h4 className="text-base font-semibold tracking-tight">{item.title}</h4>
                <p className="mt-1 text-sm text-text-muted">{item.organization}</p>
                <p className="mt-3 max-w-2xl text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}