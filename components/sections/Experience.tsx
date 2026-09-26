import SectionHeading from "@/components/SectionHeading";
import ExperienceItem from "@/components/sections/ExperienceItem";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-14 border-t border-border-color">
      <SectionHeading>Experience</SectionHeading>

      <div className="space-y-6">
        {experience.map((item) => (
          <ExperienceItem key={`${item.role}-${item.company}`} item={item} />
        ))}
      </div>
    </section>
  );
}