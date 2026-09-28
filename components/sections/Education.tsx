import SectionHeading from "@/components/SectionHeading";
import EducationItem from "@/components/sections/EducationItem";
import { education } from "@/data/education";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-14 border-t border-border-color">
      <SectionHeading>Education</SectionHeading>

      <div className="space-y-10">
        {education.map((item) => (
          <EducationItem key={`${item.institution}-${item.qualification}`} item={item} />
        ))}
      </div>
    </section>
  );
}