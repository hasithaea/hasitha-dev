"use client";

import { useEffect, useState } from "react";

const nf = new Intl.NumberFormat("en-US");

export default function CountUp({
  value,
  delay = 1500,
  duration = 2500,
}: {
  value: number;
  delay?: number;
  duration?: number;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [value, delay, duration]);

  return (
    <>
      <span className="sr-only">{nf.format(value)}</span>
      <span aria-hidden className="relative inline-block">
        <span className="invisible">{nf.format(value)}</span>
        <span className="absolute inset-0">{nf.format(n)}</span>
      </span>
    </>
  );
}
