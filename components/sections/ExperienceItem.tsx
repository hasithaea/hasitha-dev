import Image from "next/image";
import Button from "../Button";
import type { Experience } from "@/data/experience";

export default function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="border-l border-border-color pl-5">
      <div className="flex items-start gap-4">
        {item.logo && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md overflow-hidden">
            <Image
              src={item.logo}
              alt={`${item.company} logo`}
              width={96}
              height={96}
              className="h-full w-full object-contain grayscale opacity-80"
            />
          </div>
        )}

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold tracking-tight">
                {item.role}
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                {item.companyUrl ? (
                  <Button
                    variant="link"
                    href={item.companyUrl}
                  >
                    {item.company}
                  </Button>
                ) : (
                  item.company
                )}
              </p>
            </div>

            <div className="font-mono text-xs text-text-muted sm:text-right">
              <p>{item.period}</p>
              <p className="mt-1">{item.location}</p>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm text-text-muted leading-relaxed">
            {item.description}
          </p>

          <ul className="mt-4 space-y-2">
            {item.points.map((point) => (
              <li
                key={point}
                className="text-sm text-text-muted leading-relaxed pl-4 relative"
              >
                <span className="absolute left-0">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}