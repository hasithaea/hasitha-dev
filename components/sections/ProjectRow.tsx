import Link from "next/link";
import type { Project } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import type { SiteCheck, SiteStatus } from "@/lib/site-status";
import RelativeTime from "@/components/RelativeTime";
import ProjectImage from "@/components/sections/ProjectImage";

const siteStyle: Record<Exclude<SiteStatus, "unknown">, { dot: string; label: string }> = {
  up: { dot: "bg-status-good", label: "Live" },
  down: { dot: "bg-status-bad", label: "Offline" },
};

const linkCls =
  "relative z-10 text-accent hover:text-accent-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm";

export default function ProjectRow({
  project,
  stats,
  site,
}: {
  project: Project;
  stats: RepoStats | null;
  site: SiteCheck | null;
}) {
  const state = site?.status;
  const status = state && state !== "unknown" ? siteStyle[state] : null;

  return (
    <article className="relative grid gap-5 rounded-lg border border-border-color bg-bg-surface p-4 transition-colors duration-300 hover:border-accent/40 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-6">
      <div className="relative aspect-video overflow-hidden rounded-md border border-border-color">
        <ProjectImage
          title={project.title}
          src={project.image}
          sizes="(min-width: 768px) 288px, 100vw"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">
            {project.detail ? (
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h2>

          {status && (
            <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-text-muted">
              <span className={`h-2 w-2 rounded-full ${status.dot}`} aria-hidden />
              {status.label}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border-color px-2.5 py-1 font-mono text-xs text-text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-5 text-sm">
          <div className="flex items-center gap-4">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              Source
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                Live site
              </a>
            )}
          </div>

          {stats && (
            <p className="font-mono text-xs text-text-muted">
              Last push <RelativeTime iso={stats.pushedAt} mode="push" />
            </p>
          )}
        </div>
      </div>
    </article>
  );
}