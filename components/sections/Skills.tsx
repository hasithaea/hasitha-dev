import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { areaLabels, areaOrder, type Area } from "@/data/tags";
import { formatCounts, getSkillsByArea, type Skill } from "@/lib/skills";

export default function Skills() {
  const byArea = getSkillsByArea();
  const areas = areaOrder.filter((a) => byArea[a].length > 0);

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-border-color py-14"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading>Skills</SectionHeading>

        <div className="mt-8 space-y-6">
          {areas.map((area) => (
            <AreaGroup key={area} area={area} skills={byArea[area]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AreaGroup({ area, skills }: { area: Area; skills: Skill[] }) {
  return (
    <div>
      <h3 className="mb-2 px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
        {areaLabels[area]}
      </h3>

      <ul className="overflow-hidden rounded-xl border border-border-color bg-bg-surface">
        {skills.map((skill) => (
          <li
            key={skill.slug}
            className="border-t border-border-color first:border-t-0"
          >
            <Link
              href={skill.href}
              className="group flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="text-[15px] font-medium text-text-primary transition-colors duration-150 group-hover:text-accent">
                {skill.label}
              </span>
              <span className="text-[13px] tabular-nums text-text-muted sm:text-right">
                {formatCounts(skill.counts)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}