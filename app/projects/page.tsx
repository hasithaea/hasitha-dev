import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import ProjectRow from "@/components/sections/ProjectRow";
import { projects } from "@/data/projects";
import { getRepoStats } from "@/lib/github";
import { getSiteStatus } from "@/lib/site-status";

// Site pings every 10 minutes; GitHub data is cached for an hour in lib/github.ts.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "DevOps and software projects by Hasitha Amarasinghe, with live status and recent activity from GitHub.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [stats, sites] = await Promise.all([
    Promise.all(projects.map((p) => getRepoStats(p.repo))),
    Promise.all(
      projects.map((p) => (p.live ? getSiteStatus(p.live) : Promise.resolve(null))),
    ),
  ]);
  const deployed = projects.filter((p) => p.live).length;

  return (
    <PageShell footer={<Footer />}>
      <section className="pb-16 pt-32">
        <p className="font-mono text-xs text-text-muted">
          {projects.length} projects, {deployed} deployed
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Projects
        </h1>
        <p className="mt-3 max-w-xl leading-relaxed text-text-muted">
          Things I have built and deployed. Status and activity are checked
          automatically from GitHub and the live sites.
        </p>

        <div className="mt-10 flex flex-col gap-5">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              stats={stats[i]}
              site={sites[i]}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}