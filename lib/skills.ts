import { tags, areaOrder, type Area, type Tag, type TagSlug } from "@/data/tags";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";

export type EvidenceType = "project" | "certification" | "repo";

export interface Evidence {
  title: string;
  type: EvidenceType;
  tags: TagSlug[];
}

// Weight for ordering.
const WEIGHT: Record<EvidenceType, number> = {
  certification: 2,
  project: 3,
  repo: 1,
};

// Display order. strongest first.
export const typeOrder: EvidenceType[] = ["certification", "project", "repo"];

export type Counts = Record<EvidenceType, number>;

export interface Skill {
  slug: TagSlug;
  label: string;
  learning: boolean;
  counts: Counts;
  weight: number;
}

export function getEvidence(): Evidence[] {
  return [
    ...projects.map((p) => ({
      title: p.title,
      type: "project" as const,
      tags: p.tags,
    })),
    ...certifications.map((c) => ({
      title: c.name,
      type: "certification" as const,
      tags: c.tags,
    })),
    ...education.flatMap((e) =>
      e.coursework
        .filter((c) => c.repo && c.tags && c.tags.length > 0)
        .map((c) => ({
          title: c.name,
          type: "repo" as const,
          tags: c.tags ?? [],
        })),
    ),
  ];
}

export function getSkillsByArea(): Record<Area, Skill[]> {
  const found = new Map<TagSlug, Counts>();

  for (const item of getEvidence()) {
    for (const slug of new Set(item.tags)) {
      const counts = found.get(slug) ?? { certification: 0, project: 0, repo: 0 };
      counts[item.type] += 1;
      found.set(slug, counts);
    }
  }

  const out: Record<Area, Skill[]> = {
    languages: [],
    web: [],
    devops: [],
    cloud: [],
    data: [],
  };

  found.forEach((counts, slug) => {
    const tag: Tag = tags[slug];
    const weight = typeOrder.reduce((sum, t) => sum + counts[t] * WEIGHT[t], 0);
    out[tag.area].push({
      slug,
      label: tag.label,
      learning: tag.learning ?? false,
      counts,
      weight,
    });
  });

  for (const area of areaOrder) {
    out[area].sort(
      (a, b) =>
        b.weight - a.weight ||
        b.counts.certification - a.counts.certification ||
        b.counts.project - a.counts.project ||
        a.label.localeCompare(b.label),
    );
  }

  return out;
}