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
      signal: AbortSignal.timeout(8000),
    });
    status = res.status < 500 ? "up" : "down";
  } catch {
    status = "unknown";
  }
  return { status, checkedAt: new Date().toISOString() };
}