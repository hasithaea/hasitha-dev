"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa6";
import Button from "@/components/Button";

const SHOW_ABOVE = 80; // always visible near the top of the page
const DELTA = 6; // ignore tiny scroll

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Hide while scrolling down. reveal on upward scroll.
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;
      if (y < SHOW_ABOVE) setHidden(false);
      else if (diff > DELTA) setHidden(true);
      else if (diff < -DELTA) setHidden(false);
      if (Math.abs(diff) > DELTA) lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

// Menu remember where it was opened.
// Navigating to another page closes it automatically.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const toggle = () => setOpenAt(open ? null : pathname);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const homeActive = pathname === "/";

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden && !open ? "translate-y-[-130%]" : "translate-y-0"
      }`}
    >
      <div className="w-full max-w-3xl">
        <nav aria-label="Main" className="glass rounded-full [--glass-drop:0_12px_32px_-12px_rgba(0,0,0,0.6)]">
          <div className="flex h-14 items-center justify-between px-6">
            <Link href="/" className="text-base font-semibold tracking-tight">
              <span className="text-accent">hasitha</span>
              <span className="text-text-muted">.dev</span>
            </Link>

            {/* desktop */}
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/"
                aria-current={homeActive ? "page" : undefined}
                className={`text-sm transition-colors duration-200 ${
                  homeActive
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                Home
              </Link>
              <a
                href="https://github.com/hasithaea"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-muted transition-colors duration-200 hover:text-text-primary"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <Button href="/contact">Contact</Button>
            </div>

            {/* mobile toggle */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={toggle}
              className="-mr-2 p-2 text-text-muted transition-colors hover:text-text-primary md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* mobile panel */}
        {open && (
          <div
            id="mobile-menu"
            className="glass mt-2 rounded-3xl px-4 py-4 md:hidden [--glass-drop:0_12px_32px_-12px_rgba(0,0,0,0.6)]"
          >
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  aria-current={homeActive ? "page" : undefined}
                  className={`block rounded-xl px-3 py-2.5 text-base ${
                    homeActive
                      ? "bg-white/5 text-text-primary"
                      : "text-text-muted hover:bg-white/5 hover:text-text-primary"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/hasithaea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-base text-text-muted hover:bg-white/6 hover:text-text-primary"
                >
                  <FaGithub className="h-5 w-5" />
                  GitHub
                </a>
              </li>
            </ul>
            <div className="mt-3 border-t border-border-color pt-4">
              <Button href="/contact" className="w-full justify-center">
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}