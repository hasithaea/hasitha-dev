const API = "https://api.github.com";

export type CiState = "passing" | "failing" | "unknown";

export type RepoStats = {
  pushedAt: string; // folder URLs - the latest commit touched folder
  language: string | null;
  ci: CiState;
  commits: number | null; // folder URLs - commits touched folder
};
 
function parseRepo(url: string): { repo: string; path: string | null } | null {
  const m = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  if (!m) return null;
  const folder = url.match(/\/tree\/[^/]+\/([^#?]+)/);
  return {
    repo: `${m[1]}/${m[2]}`,
    path: folder ? folder[1].replace(/\/+$/, "") : null,
  };
}

function ghFetch(path: string) {
  return fetch(`${API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    },
    next: { revalidate: 3600 },
  });
}

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await ghFetch(path);
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

type Commit = {
  commit: {
    committer: { date: string } | null;
    author: { date: string } | null;
  };
};

async function getCommits(
  repo: string,
  path: string | null,
): Promise<{ count: number; lastDate: string | null } | null> {
  try {
    const qs = path ? `&path=${encodeURIComponent(path)}` : "";
    const res = await ghFetch(`/repos/${repo}/commits?per_page=1${qs}`);
    if (!res.ok) return null;

    const body = (await res.json()) as Commit[];
    const last = res.headers
      .get("link")
      ?.match(/[?&]page=(\d+)[^>]*>;\s*rel="last"/);
    const first = body[0]?.commit;

    return {
      count: last ? Number(last[1]) : body.length,
      lastDate: first?.committer?.date ?? first?.author?.date ?? null,
    };
  } catch {
    return null;
  }
}

export async function getRepoStats(repoUrl: string): Promise<RepoStats | null> {
  const parsed = parseRepo(repoUrl);
  if (!parsed) return null;
  const { repo, path } = parsed;

  const [info, runs, commits] = await Promise.all([
    gh<{ pushed_at: string; language: string | null }>(`/repos/${repo}`),
    gh<{ workflow_runs: { conclusion: string | null }[] }>(
      `/repos/${repo}/actions/runs?status=completed&per_page=1`,
    ),
    getCommits(repo, path),
  ]);

  if (!info) return null;

  const conclusion = runs?.workflow_runs[0]?.conclusion;
  const ci: CiState =
    conclusion === "success"
      ? "passing"
      : conclusion === "failure" || conclusion === "timed_out"
        ? "failing"
        : "unknown";

  return {
    pushedAt: (path ? commits?.lastDate : null) ?? info.pushed_at,
    language: info.language,
    ci,
    commits: commits?.count ?? null,
  };
}