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
      className="scroll-mt-24 border-t border-border-color py-16 md:py-20"
    >
      <SectionHeading>Skills</SectionHeading>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16 lg:gap-24">
        {/* Intro */}
        <div className="md:sticky md:top-28 md:self-start">
          <h3 className="text-balance text-2xl font-medium leading-snug tracking-tight text-text-primary md:text-3xl md:leading-snug">
            What I work with, and{" "}
            <span className="text-accent">Where I&apos;ve used it.</span>
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
            Counts show the projects, certifications and repos behind each
            skill. Select one to see the evidence.
          </p>
        </div>

        {/* Groups */}
        <div className="space-y-8">
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
      <h3 className="mb-2.5 px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
        {areaLabels[area]}
      </h3>

      {/* Single column below lg; two columns from lg. A lone last item spans the row. */}
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border-color bg-border-color lg:grid-cols-2 lg:[&>li:last-child:nth-child(odd)]:col-span-2">
        {skills.map((skill) => (
          <li key={skill.slug} className="bg-bg-surface">
            <Link
              href={skill.href}
              className="group flex h-full flex-col justify-between gap-1.5 px-4 py-3 transition-colors duration-150 hover:bg-white/3 focus-visible:bg-white/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
            >
              <span className="text-[15px] font-medium text-text-primary transition-colors duration-150 group-hover:text-accent">
                {skill.label}
              </span>
              <span className="text-[12px] leading-snug text-text-muted">
                {formatCounts(skill.counts)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}