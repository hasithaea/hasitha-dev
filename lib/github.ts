const API = "https://api.github.com";

export type CiState = "passing" | "failing" | "unknown";

export type RepoStats = {
  pushedAt: string;
  language: string | null;
  ci: CiState;
  commits: number | null;
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

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 },
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}


async function ghWithTotal<T>(
  path: string,
): Promise<{ data: T | null; total: number | null }> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { data: null, total: null };
    const data = (await res.json()) as T;

    const link = res.headers.get("Link");
    if (link) {
      const m = link.match(/&page=(\d+)>; rel="last"/);
      if (m) return { data, total: parseInt(m[1], 10) };
    }
    // No Link header = only one page = count is array length
    return { data, total: Array.isArray(data) ? data.length : null };
  } catch {
    return { data: null, total: null };
  }
}

type Commit = {
  commit: {
    committer: { date: string } | null;
    author: { date: string } | null;
  };
};

export async function getRepoStats(repoUrl: string): Promise<RepoStats | null> {
  const parsed = parseRepo(repoUrl);
  if (!parsed) return null;
  const { repo, path } = parsed;

  const commitsPath = path
    ? `/repos/${repo}/commits?path=${encodeURIComponent(path)}&per_page=1`
    : `/repos/${repo}/commits?per_page=1`;

  const [info, runs, commitsResult] = await Promise.all([
    gh<{ pushed_at: string; language: string | null }>(`/repos/${repo}`),
    gh<{ workflow_runs: { conclusion: string | null }[] }>(
      `/repos/${repo}/actions/runs?status=completed&per_page=1`,
    ),
    ghWithTotal<Commit[]>(commitsPath),
  ]);

  if (!info) return null;

  const conclusion = runs?.workflow_runs[0]?.conclusion;
  const ci: CiState =
    conclusion === "success"
      ? "passing"
      : conclusion === "failure" || conclusion === "timed_out"
        ? "failing"
        : "unknown";

  const commits = commitsResult.data;
  const folderDate =
    commits?.[0]?.commit.committer?.date ?? commits?.[0]?.commit.author?.date;

  return {
    pushedAt: folderDate ?? info.pushed_at,
    language: info.language,
    ci,
    commits: commitsResult.total,
  };
}