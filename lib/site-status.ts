export type SiteStatus = "up" | "down" | "unknown";

export type SiteCheck = {
  status: SiteStatus;
  checkedAt: string; // time ping ran
};

export async function getSiteStatus(url: string): Promise<SiteCheck> {
  let status: SiteStatus;
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(15000),
    });
    status = res.ok ? "up" : res.status < 500 ? "unknown" : "down";
  } catch {
    status = "unknown";
  }
  return { status, checkedAt: new Date().toISOString() };
}