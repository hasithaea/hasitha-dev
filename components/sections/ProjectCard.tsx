import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-border-color bg-bg-surface p-5 transition-colors duration-300 hover:border-accent/40">
      <h3 className="text-base font-semibold tracking-tight">
        {project.title}
      </h3>

      <p className="mt-2 text-sm text-text-muted leading-relaxed">
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

      <div className="mt-5 flex items-center gap-4 text-sm">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
        >
          Source
        </a>

        {project.live && (
            <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
            >
            Live site
            </a>
        )}
      </div>
    </article>
  );
}