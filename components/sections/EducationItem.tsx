import type { Education } from "@/data/education";

export default function EducationItem({ item }: { item: Education }) {
  return (
    <article className="border-l border-border-color pl-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h4 className="font-semibold tracking-tight">
            {item.qualification}
          </h4>
          <p className="mt-1 text-sm text-text-muted">{item.institution}</p>
        </div>

        {item.period && (
          <span className="font-mono text-xs text-text-muted">
            {item.period}
          </span>
        )}
      </div>

      {item.description && (
        <p className="mt-3 max-w-2xl text-sm text-text-muted leading-relaxed">
          {item.description}
        </p>
      )}

      {item.coursework.length > 0 && (
        <div className="mt-4">
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
            Selected coursework
          </p>

          <div className="flex flex-wrap gap-2">
            {item.coursework.map((course) => (
                <a
                    key={course.name}
                    href={course.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border-color bg-bg-surface px-3 py-1.5 font-mono text-xs text-text-muted hover:border-accent/40 hover:text-text-primary transition-colors"
                >
                {course.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}