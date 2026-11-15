import { unstable_cache } from "next/cache";

const LOGIN = "hasithaea";
const WEEKS = 36;

export type Level = 0 | 1 | 2 | 3 | 4;

export type GitHubActivity = {
  login: string;
  total: number;
  commits: number;
  pullRequests: number;
  issues: number;
  days: { date: string; count: number; level: Level }[];
  lastPush: string | null;
  recent: { repo: string; sha: string; message: string }[];
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
      repositories(
        first: 3
        privacy: PUBLIC
        isFork: false
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          pushedAt
          defaultBranchRef {
            target {
              ... on Commit {
                oid
                messageHeadline
              }
            }
          }
        }
      }
    }
  }
`;

function toLevel(count: number, max: number): Level {
  if (count <= 0 || max <= 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

async function fetchActivity(): Promise<GitHubActivity> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);

  const json = await res.json();
  const user = json?.data?.user;
  if (!user || json.errors) throw new Error("GitHub GraphQL returned errors");

  const collection = user.contributionsCollection;
  const calendar = collection.contributionCalendar;

  const weeks: { contributionDays: { date: string; contributionCount: number }[] }[] =
    calendar.weeks.slice(-WEEKS);
  const raw = weeks.flatMap((w) => w.contributionDays);
  const max = Math.max(0, ...raw.map((d) => d.contributionCount));
  const days = raw.map((d) => ({
    date: d.date,
    count: d.contributionCount,
    level: toLevel(d.contributionCount, max),
  }));

  const repos: {
    name: string;
    pushedAt: string;
    defaultBranchRef: {
      target?: { oid?: string; messageHeadline?: string };
    } | null;
  }[] = user.repositories.nodes ?? [];

  const recent = repos
    .filter((r) => r.defaultBranchRef?.target?.oid)
    .map((r) => ({
      repo: r.name,
      sha: r.defaultBranchRef!.target!.oid!.slice(0, 7),
      message: r.defaultBranchRef!.target!.messageHeadline ?? "",
    }));

  return {
    login: LOGIN,
    total: calendar.totalContributions,
    commits: collection.totalCommitContributions,
    pullRequests: collection.totalPullRequestContributions,
    issues: collection.totalIssueContributions,
    days,
    lastPush: repos[0]?.pushedAt ?? null,
    recent,
  };
}

const cachedActivity = unstable_cache(fetchActivity, ["github-activity"], {
  revalidate: 3600,
});

// Null only if there has never been a good result
export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  try {
    return await cachedActivity();
  } catch {
    return null;
  }
}