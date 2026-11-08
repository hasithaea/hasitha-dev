import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import { tags, type TagSlug } from "@/data/tags";
import {
  countByType,
  formatCounts,
  getEvidenceForTag,
  getTagPageSlugs,
  hasTagPage,
  isTagSlug,
  typeOrder,
  type Evidence,
  type EvidenceType,
} from "@/lib/skills";
import Button from "@/components/Button";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTagPageSlugs().map((tag) => ({ tag }));
}

type Props = { params: Promise<{ tag: string }> };

const groupHeadings: Record<EvidenceType, string> = {
  project: "Projects",
  certification: "Certifications",
  repo: "Course repos",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  if (!isTagSlug(tag) || !hasTagPage(tag)) return {};

  const label = tags[tag].label;
  const summary = formatCounts(countByType(getEvidenceForTag(tag)));

  return {
    title: label,
    description: `${label}: ${summary}.`,
    alternates: { canonical: `/skills/${tag}` },
  };
}

export default async function SkillPage({ params }: Props) {
  const { tag } = await params;
  if (!isTagSlug(tag) || !hasTagPage(tag)) notFound();

  const label = tags[tag].label;
  const items = getEvidenceForTag(tag);

  return (
    <PageShell footer={<Footer />}>
      <div className="pt-28 pb-16 md:pt-32">
        <Button href="/#skills" variant="mono">
          Back to skills
        </Button>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-text-primary">
          {label}
        </h1>
        <p className="mt-2 text-text-muted">
          {formatCounts(countByType(items))}
        </p>

        <div className="mt-10 space-y-10">
          {typeOrder.map((type) => {
            const group = items.filter((i) => i.type === type);
            if (group.length === 0) return null;

            return (
              <section key={type}>
                <h2 className="mb-2 px-4 text-sm text-text-muted">
                  {groupHeadings[type]}
                </h2>
                <ul className="overflow-hidden rounded-xl border border-border-color bg-bg-surface">
                  {group.map((item) => (
                    <EvidenceRow key={item.title} item={item} current={tag} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}

function EvidenceRow({ item, current }: { item: Evidence; current: TagSlug }) {
  const others = Array.from(new Set(item.tags)).filter((s) => s !== current);
  const linkClass = "transition-colors hover:text-accent";

  let title: React.ReactNode = item.title;
  if (item.href && item.external) {
    title = (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {item.title}
      </a>
    );
  } else if (item.href) {
    title = (
      <Link href={item.href} className={linkClass}>
        {item.title}
      </Link>
    );
  }

  return (
    <li className="flex gap-4 border-t border-border-color px-4 py-3 first:border-t-0">
      {item.image && (
        <div className="relative aspect-16/10 w-28 shrink-0 self-start overflow-hidden rounded-md border border-border-color bg-bg-primary sm:w-40">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 640px) 160px, 112px"
            className={
              item.image.fit === "contain" ? "object-contain" : "object-cover"
            }
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium text-text-primary">{title}</p>
        <p className="mt-1 line-clamp-2 text-[13px] text-text-muted">
          {item.context}
        </p>
        {others.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-text-muted">
            {others.map((s) => (
              <li key={s}>
                {hasTagPage(s) ? (
                  <Link href={`/skills/${s}`} className={linkClass}>
                    {tags[s].label}
                  </Link>
                ) : (
                  tags[s].label
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}