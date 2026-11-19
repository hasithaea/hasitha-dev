import type { GitHubActivity, Level } from "@/lib/github-activity";
import { FaGithub } from "react-icons/fa6";
import CountUp from "@/components/CountUp";

const CELL = 11;
const GAP = 3;
const PAD = 20;

const levelBg: Record<Level, string> = {
  0: "bg-white/[0.04]",
  1: "bg-accent/20",
  2: "bg-accent/40",
  3: "bg-accent/65",
  4: "bg-accent/90",
};

type Day = GitHubActivity["days"][number];

function timeAgo(iso: string): string {
  const mins = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${Math.max(1, mins)}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

function chunkWeeks(days: Day[]): Day[][] {
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

function monthLabels(weeks: Day[][]): string[] {
  const dates = weeks.map((w) => new Date(`${w[0].date}T00:00:00Z`));
  const labels = dates.map((d, i) =>
    i === 0 || d.getUTCMonth() !== dates[i - 1].getUTCMonth() ? monthFmt.format(d) : "",
  );
  const next = labels.findIndex((l, i) => i > 0 && l !== "");
  if (next !== -1 && next < 3) labels[0] = "";
  return labels;
}

const nf = new Intl.NumberFormat("en-US");

export default function GitHubActivityCard({ data }: { data: GitHubActivity }) {
  const stats = [
    { label: "Commits", value: data.commits },
    { label: "Pull requests", value: data.pullRequests },
    { label: "Issues", value: data.issues },
  ];

  const weeks = chunkWeeks(data.days);
  const labels = monthLabels(weeks);
  const cols = weeks.length;
  const columns = `repeat(${cols}, minmax(0, ${CELL}px))`;
  const cardWidth = cols * CELL + (cols - 1) * GAP + PAD * 2;

  return (
    <aside
      aria-label="GitHub activity"
      style={{ "--card-w": `${cardWidth}px` } as React.CSSProperties}
      className="w-full max-w-(--card-w) overflow-hidden rounded-xl border border-border-color bg-bg-surface lg:justify-self-end"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <a
            href={`https://github.com/${data.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <FaGithub className="h-4 w-4" aria-hidden />
            github.com/{data.login}
          </a>
          {data.lastPush && (
            <p className="mt-1.5 text-xs text-text-muted">
              last push · {timeAgo(data.lastPush)} ago
            </p>
          )}
        </div>

        <p className="sm:text-right">
          <span className="block text-4xl font-bold leading-none tabular-nums text-text-primary">
            <CountUp value={data.total} />
          </span>
          <span className="mt-1.5 block text-xs text-text-muted">
            contributions in the last year
          </span>
        </p>
      </div>

      {/* Heatmap */}
      <div className="px-5 pb-4">
        <div
          aria-hidden="true"
          className="mb-1.5 grid text-[11px] leading-none text-text-muted"
          style={{ gridTemplateColumns: columns, columnGap: GAP }}
        >
          {labels.map((label, i) => (
            <span key={i} className="whitespace-nowrap">
              {label}
            </span>
          ))}
        </div>

        <div
          role="img"
          aria-label={`Contribution heatmap for the last ${cols} weeks`}
          className="grid grid-flow-col grid-rows-7"
          style={{ gridTemplateColumns: columns, gap: GAP }}
        >
          {data.days.map((d, i) => (
            <i
              key={d.date}
              title={`${d.count} on ${d.date}`}
              style={{ "--c": Math.floor(i / 7) } as React.CSSProperties}
              className={`cell-in block aspect-square w-full rounded-xs ${levelBg[d.level]}`}
            />
          ))}
        </div>

        <div
          className="mt-2.5 flex items-center gap-1 text-[11px] text-text-muted"
          aria-hidden="true"
        >
          Less
          {([0, 1, 2, 3, 4] as Level[]).map((l) => (
            <i
              key={l}
              className={`block size-2.25 rounded-xs ${levelBg[l]}`}
            />
          ))}
          More
        </div>
      </div>

      {/* Stats */}
      <dl className="grid grid-cols-3 border-t border-border-color">
        {stats.map(({ label, value }, i) => (
          <div
            key={label}
            className={`px-4 py-3 ${i > 0 ? "border-l border-border-color" : ""}`}
          >
            <dd className="text-[17px] font-medium leading-tight tabular-nums text-text-primary">
              <CountUp value={value} />
            </dd>
            <dt className="mt-0.5 text-xs text-text-muted">{label}</dt>
          </div>
        ))}
      </dl>

      {/* 3 Recent commits */}
      {data.recent.length > 0 && (
        <ul className="hidden flex-col border-t border-border-color lg:flex">
          {data.recent.slice(0, 3).map((c) => (
            <li
              key={c.sha}
              className="flex items-baseline gap-3 border-t border-border-color/60 px-4 py-2 text-xs first:border-t-0"
            >
              <span className="font-mono text-[11px] text-accent">{c.sha}</span>
              <span className="min-w-0 flex-1 truncate text-text-muted">
                <span className="text-text-primary">{c.repo}</span>{" "}
                {c.message}
              </span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}