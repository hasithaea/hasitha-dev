import SectionHeading from "@/components/SectionHeading";
import { areaLabels, areaOrder, type Area } from "@/data/tags";
import {
  getSkillsByArea,
  type Skill,
  type EvidenceType,
} from "@/lib/skills";

const breakdownOrder: EvidenceType[] = ["project", "certification", "repo"];

const typeLabels: Record<EvidenceType, [string, string]> = {
  project: ["project", "projects"],
  certification: ["certification", "certifications"],
  repo: ["course repo", "course repos"],
};

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

      <div className="overflow-hidden rounded-xl border border-border-color bg-bg-surface/70">
        {skills.map((skill, i) => (
          <SkillRow key={skill.slug} skill={skill} isFirst={i === 0} />
        ))}
      </div>
    </div>
  );
}

function SkillRow({ skill, isFirst }: { skill: Skill; isFirst: boolean }) {
  const breakdown = breakdownOrder
    .filter((t) => skill.counts[t] > 0)
    .map((t) => {
      const n = skill.counts[t];
      const [one, many] = typeLabels[t];
      return `${n} ${n === 1 ? one : many}`;
    })
    .join(" · ");

  return (
    <div
      className={`flex flex-col gap-0.5 px-4 py-2.5 transition-colors duration-150 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
        !isFirst ? "border-t border-border-color/60" : ""
      }`}
    >
      <span className="text-[15px] font-medium text-text-primary">
        {skill.label}
      </span>

      <p className="text-[13px] tabular-nums text-text-muted sm:text-right">
        {breakdown}
      </p>
    </div>
  );
}