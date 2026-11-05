import { areaLabels, areaOrder } from "@/data/tags";
import { getSkillsByArea, typeOrder } from "@/lib/skills";
import type { EvidenceType } from "@/lib/skills";

const nouns: Record<EvidenceType, [string, string]> = {
  certification: ["certification", "certifications"],
  project: ["project", "projects"],
  repo: ["repo", "repos"],
};

export default function Skills() {
  const byArea = getSkillsByArea();

  return (
    <section aria-labelledby="skills-heading" className="py-16">
      <h2
        id="skills-heading"
        className="text-2xl font-semibold tracking-tight text-text-primary"
      >
        Skills
      </h2>

      <div className="mt-8 border-b border-border-color">
        {areaOrder
          .filter((area) => byArea[area].length > 0)
          .map((area) => (
            <div
              key={area}
              className="grid gap-4 border-t border-border-color py-6 md:grid-cols-[11rem_1fr] md:gap-8"
            >
              <h3 className="text-sm text-text-muted">{areaLabels[area]}</h3>

              <ul className="grid grid-cols-2 items-start gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
                {byArea[area].map((skill) => (
                  <li key={skill.slug}>
                    <p className="text-text-primary">{skill.label}</p>
                    {skill.learning && (
                      <p className="text-sm text-text-muted">Learning</p>
                    )}
                    {typeOrder
                      .filter((type) => skill.counts[type] > 0)
                      .map((type) => {
                        const n = skill.counts[type];
                        const [one, many] = nouns[type];
                        return (
                          <p key={type} className="text-sm text-text-muted">
                            {n} {n === 1 ? one : many}
                          </p>
                        );
                      })}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </section>
  );
}