import type { Metadata } from "next";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import RelativeTime from "@/components/RelativeTime";
import ProjectImage from "@/components/sections/ProjectImage";
import { projects } from "@/data/projects";
import { getRepoStats } from "@/lib/github";
import { getSiteStatus } from "@/lib/site-status";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 600;
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.detail);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

const label = "font-mono text-xs uppercase tracking-wider text-text-muted";

const pill =
  "inline-flex items-center rounded-full border border-border-color px-3 py-1.5 text-sm font-medium text-text-muted transition-colors duration-300 hover:border-accent hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const siteLabel = { up: "Up", down: "Down", unknown: "Unknown" } as const;
const siteDot = {
  up: "bg-status-good",
  down: "bg-status-bad",
  unknown: "bg-slate",
} as const;

const ciLabel = { passing: "Passing", failing: "Failing" } as const;
const ciDot = {
  passing: "bg-status-good",
  failing: "bg-status-bad",
} as const;

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project?.detail) notFound();

  const [stats, site] = await Promise.all([
    getRepoStats(project.repo),
    project.live ? getSiteStatus(project.live) : Promise.resolve(null),
  ]);

  const gallery = project.detail.gallery ?? [];
  const showCommits =
    stats?.commits !== null &&
    stats?.commits !== undefined &&
    !project.hideCommits;

  const buildStatus =
    stats?.ci === "passing" || stats?.ci === "failing" ? stats.ci : null;

  const hasDetails = Boolean(
    site || buildStatus || stats?.language || stats?.pushedAt || showCommits,
  );

  return (
    <PageShell footer={<Footer />}>
      <article className="pb-24 pt-28">
        <Button variant="pill" href="/projects">
          ← All projects
        </Button>

        <header className="mt-8">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
            {project.summary}
          </p>
        </header>

        <div className="relative mt-10 aspect-video overflow-hidden rounded-xl border border-border-color bg-bg-surface">
          <ProjectImage
            title={project.title}
            src={project.image}
            sizes="(min-width: 1024px) 896px, 100vw"
            priority
          />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="space-y-14">
            {project.detail.sections.map((section, i) => (
              <section key={section.heading}>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight">
                    {section.heading}
                  </h2>
                </div>
                <div className="mt-4 space-y-4">
                  {section.body.map((para) => (
                    <p
                      key={para}
                      className="max-w-prose leading-relaxed text-text-muted"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {gallery.length > 0 && (
              <section>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent">—</span>
                  <h2 className="text-xl font-semibold tracking-tight">
                    Screenshots
                  </h2>
                </div>
                <div className="mt-5">
                  <ScreenshotGallery shots={gallery} />
                </div>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-5 rounded-xl border border-border-color bg-bg-surface p-5">
              {/* Links */}
              <div>
                <h2 className={label}>Links</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={pill}
                    >
                      Live site
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${pill} gap-1.5`}
                  >
                    <FaGithub className="h-4 w-4" aria-hidden />
                    Source
                  </a>
                </div>
              </div>

              {/* Stack */}
              <div className="border-t border-border-color pt-5">
                <h2 className={label}>Stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border-color px-2.5 py-1 font-mono text-xs text-text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details */}
              {hasDetails && (
                <div className="border-t border-border-color pt-5">
                  <h2 className={label}>Details</h2>
                  <dl className="mt-3 space-y-2 text-sm">
                    {site && (
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-text-muted">Live site</dt>
                        <dd className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${siteDot[site.status]}`}
                            aria-hidden
                          />
                          {siteLabel[site.status]}
                        </dd>
                      </div>
                    )}
                    {buildStatus && (
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-text-muted">Build</dt>
                        <dd className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${ciDot[buildStatus]}`}
                            aria-hidden
                          />
                          {ciLabel[buildStatus]}
                        </dd>
                      </div>
                    )}
                    {stats?.language && (
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-text-muted">Language</dt>
                        <dd>{stats.language}</dd>
                      </div>
                    )}
                    {stats?.pushedAt && (
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-text-muted">Last push</dt>
                        <dd>
                          <RelativeTime iso={stats.pushedAt} mode="push" />
                        </dd>
                      </div>
                    )}
                    {showCommits && (
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-text-muted">Commits</dt>
                        <dd className="font-mono">{stats?.commits}</dd>
                      </div>
                    )}
                  </dl>
                  {site && (
                    <p className="mt-3 font-mono text-xs text-text-muted">
                      Checked <RelativeTime iso={site.checkedAt} mode="check" />
                    </p>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </PageShell>
  );
}