import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
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
          <Reveal>
            <h3 className="text-balance text-2xl font-medium leading-snug tracking-tight text-text-primary md:text-3xl md:leading-snug">
              What I work with, and{" "}
              <span className="text-accent">Where I&apos;ve used it.</span>
            </h3>
          </Reveal>
          <Reveal delay={120} className="mt-4">
            <p className="text-[15px] leading-relaxed text-text-muted">
              Counts show the projects, certifications and repos behind each
              skill. Select one to see the evidence.
            </p>
          </Reveal>
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
      <Reveal
        as="h3"
        className="mb-2.5 px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted"
      >
        {areaLabels[area]}
      </Reveal>

      {/* Skills */}
      <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:[&>li:last-child:nth-child(odd)]:col-span-2">
        {skills.map((skill, i) => (
          <Reveal
            key={skill.slug}
            as="li"
            delay={80 + Math.min(i, 5) * 70}
            className="filter:none"
          >
            <Link
              href={skill.href}
              className="group flex h-full flex-col justify-between gap-1.5 rounded-lg border border-border-color bg-bg-surface px-4 py-3 transition-colors duration-300 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="text-[15px] font-medium text-text-primary transition-colors duration-150 group-hover:text-accent">
                {skill.label}
              </span>
              <span className="text-[12px] leading-snug text-text-muted">
                {formatCounts(skill.counts)}
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}