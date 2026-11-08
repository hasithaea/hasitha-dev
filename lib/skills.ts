import { tags, areaOrder, type Area, type Tag, type TagSlug } from "@/data/tags";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";

export type EvidenceType = "project" | "certification" | "repo";

export interface Evidence {
  title: string;
  type: EvidenceType;
  tags: TagSlug[];
  context: string;
  href: string | null;
  external: boolean;
  image: EvidenceImage | null;
}

export interface EvidenceImage {
  src: string;
  alt: string;
  fit: "cover" | "contain";
}

// Weight for ordering
const WEIGHT: Record<EvidenceType, number> = {
  project: 3,
  certification: 2,
  repo: 1,
};

// Display order
export const typeOrder: EvidenceType[] = ["project", "certification", "repo"];

const typeLabels: Record<EvidenceType, [string, string]> = {
  project: ["project", "projects"],
  certification: ["certification", "certifications"],
  repo: ["course repo", "course repos"],
};

export type Counts = Record<EvidenceType, number>;

export interface Skill {
  slug: TagSlug;
  label: string;
  counts: Counts;
  weight: number;
  href: string;
}

export function getEvidence(): Evidence[] {
  return [
    ...projects.map((p) => ({
      title: p.title,
      type: "project" as const,
      tags: p.tags,
      context: p.summary,
      href: `/projects/${p.slug}`,
      external: false,
      image: p.image
        ? {
            src: p.image,
            alt: `${p.title} cover image`,
            fit: p.imageFit ?? ("cover" as const),
          }
        : null,
    })),
    ...certifications.map((c) => ({
      title: c.name,
      type: "certification" as const,
      tags: c.tags,
      context: `${c.issuer} · ${c.detail}`,
      href: c.links?.[0]?.url ?? null,
      external: true,
      image: c.images?.[0]
        ? {
            src: c.images[0].src,
            alt: `${c.name}: ${c.images[0].caption}`,
            fit: "contain" as const,
          }
        : null,
    })),
    ...education.flatMap((e) =>
      e.coursework
        .filter((c) => c.repo && c.tags && c.tags.length > 0)
        .map((c) => ({
          title: c.name,
          type: "repo" as const,
          tags: c.tags ?? [],
          context: "Course repo",
          href: c.repo ?? null,
          external: true,
          image: null,
        })),
    ),
  ];
}

function buildIndex(): Map<TagSlug, Evidence[]> {
  const index = new Map<TagSlug, Evidence[]>();
  for (const item of getEvidence()) {
    for (const slug of new Set(item.tags)) {
      const list = index.get(slug) ?? [];
      list.push(item);
      index.set(slug, list);
    }
  }
  return index;
}

export function countByType(items: Evidence[]): Counts {
  const counts: Counts = { project: 0, certification: 0, repo: 0 };
  for (const item of items) counts[item.type] += 1;
  return counts;
}

export function formatCounts(counts: Counts): string {
  return typeOrder
    .filter((t) => counts[t] > 0)
    .map((t) => {
      const n = counts[t];
      const [one, many] = typeLabels[t];
      return `${n} ${n === 1 ? one : many}`;
    })
    .join(" · ");
}

export function isTagSlug(value: string): value is TagSlug {
  return value in tags;
}

export function getEvidenceForTag(slug: TagSlug): Evidence[] {
  return buildIndex().get(slug) ?? [];
}

export function hasTagPage(slug: TagSlug): boolean {
  return getEvidenceForTag(slug).length >= 1;
}

export function getTagPageSlugs(): TagSlug[] {
  const index = buildIndex();
  return (Object.keys(tags) as TagSlug[]).filter(
    (slug) => (index.get(slug)?.length ?? 0) >= 1,
  );
}

export function getSkillsByArea(): Record<Area, Skill[]> {
  const out: Record<Area, Skill[]> = {
    languages: [],
    web: [],
    devops: [],
    cloud: [],
    data: [],
  };

  buildIndex().forEach((items, slug) => {
    const tag: Tag = tags[slug];
    const counts = countByType(items);
    const weight = typeOrder.reduce((sum, t) => sum + counts[t] * WEIGHT[t], 0);

    out[tag.area].push({
      slug,
      label: tag.label,
      counts,
      weight,
      href: `/skills/${slug}`,
    });
  });

  for (const area of areaOrder) {
    out[area].sort(
      (a, b) =>
        b.weight - a.weight ||
        b.counts.project - a.counts.project ||
        b.counts.certification - a.counts.certification ||
        a.label.localeCompare(b.label),
    );
  }

  return out;
}