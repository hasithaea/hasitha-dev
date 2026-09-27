import SectionHeading from "@/components/SectionHeading";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-14 border-t border-border-color">
      <SectionHeading>Skills</SectionHeading>

      <div className="space-y-6">
        {skills.map(({ group, items }) => (
          <div key={group} className="sm:flex sm:gap-8">
            <h3 className="text-sm text-text-muted sm:w-44 sm:shrink-0 sm:pt-1">{group}</h3>
            <ul className="mt-2 sm:mt-0 flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={item} className="rounded-md border border-border-color bg-bg-surface px-3 py-1.5 font-mono text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}