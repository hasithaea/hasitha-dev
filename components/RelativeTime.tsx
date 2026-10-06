"use client";

import { useSyncExternalStore } from "react";

// push:  just now (<1h), n hours ago (<24h), n days ago (<7d), then a date
// check: just now (<1m), n mins ago, n hours ago, n days ago
type Mode = "push" | "check";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const DATE_CUTOFF = 7 * DAY;

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const dateTimeFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "UTC",
});

const ago = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"} ago`;

function relative(iso: string, mode: Mode, now: number): string {
  const date = new Date(iso);
  const diff = Math.max(0, now - date.getTime());

  if (mode === "push" && diff >= DATE_CUTOFF) return dateFmt.format(date);
  if (diff < (mode === "check" ? MIN : HOUR)) return "just now";
  if (diff < HOUR) return ago(Math.floor(diff / MIN), "min");
  if (diff < DAY) return ago(Math.floor(diff / HOUR), "hour");
  return ago(Math.floor(diff / DAY), "day");
}

function fallback(iso: string, mode: Mode): string {
  const date = new Date(iso);
  return mode === "push"
    ? dateFmt.format(date)
    : `${dateTimeFmt.format(date)} UTC`;
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, MIN);
  return () => clearInterval(id);
}

export default function RelativeTime({ iso, mode }: { iso: string; mode: Mode }) {
  const text = useSyncExternalStore(
    subscribe,
    () => relative(iso, mode, Date.now()),
    () => fallback(iso, mode),
  );

  return (
    <time dateTime={iso} title={`${dateTimeFmt.format(new Date(iso))} UTC`}>
      {text}
    </time>
  );
}
