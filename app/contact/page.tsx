"use client";

import PageShell from "@/components/PageShell";
import { useState, useEffect, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/hasithaea",
    color: "#0A66C2",
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" />
    ),
  },
  {
    name: "X",
    href: "https://x.com/hasithaea",
    color: "#F8FAFC",
    icon: (
      <path d="M18.9 1.6h3.68l-8.04 9.19 9.46 12.5h-7.4l-5.8-7.59-6.63 7.59H.48l8.6-9.83L0 1.6h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.5 3.68H4.31L17.61 21.1z" />
    ),
  },
  {
    name: "Discord",
    href: "https://discord.com/users/hasithaea",
    color: "#5865F2",
    icon: (
      <path d="M20.32 4.37a19.8 19.8 0 00-4.9-1.52.07.07 0 00-.08.04c-.21.38-.45.86-.61 1.25a18.3 18.3 0 00-5.48 0 12.6 12.6 0 00-.63-1.25.08.08 0 00-.08-.04c-1.7.3-3.36.8-4.9 1.52a.07.07 0 00-.03.03C.53 8.7-.32 12.9.1 17.05a.08.08 0 00.03.06 19.9 19.9 0 006 3.03.08.08 0 00.08-.03c.46-.63.87-1.3 1.23-2a.08.08 0 00-.04-.11 13.1 13.1 0 01-1.87-.9.08.08 0 010-.13c.13-.09.25-.19.37-.28a.08.08 0 01.08-.01c3.93 1.8 8.18 1.8 12.06 0a.08.08 0 01.08.01c.12.1.24.19.37.28a.08.08 0 010 .13c-.6.35-1.22.65-1.87.9a.08.08 0 00-.04.11c.36.7.78 1.37 1.23 2a.08.08 0 00.08.03 19.85 19.85 0 006-3.03.08.08 0 00.03-.06c.5-4.8-.83-8.97-3.52-12.65a.06.06 0 00-.03-.03zM8.02 14.6c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.17 1.1 2.15 2.42 0 1.34-.95 2.42-2.15 2.42zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.17 1.1 2.15 2.42 0 1.34-.94 2.42-2.15 2.42z" />
    ),
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Check your connection and try again.");
    }
  }

  const fadeClass = mounted
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-2";

  if (status === "success") {
    return (
      <PageShell>
        <div
          className={`max-w-md w-full text-center relative transition-all duration-700 ease-out ${fadeClass}`}
        >
          <div className="mx-auto mb-6 h-px w-10 bg-accent-gold/60" />
          <span className="font-mono text-xs tracking-widest text-accent-gold uppercase">
            Message sent
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
            Thanks. I&apos;ll get back to you soon.
          </h1>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            A confirmation with a copy of your message is on its way to your
            inbox.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-8 text-sm text-text-muted hover:text-text-primary underline underline-offset-4 decoration-[#1d2c47] hover:decoration-accent-gold/60 transition-colors"
          >
            Send another message
          </button>
          <p className="mt-10 text-sm text-text-muted">
            © 2026 Hasitha Amarasinghe
          </p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div
        className={`max-w-md w-full relative py-16 transition-all duration-700 ease-out ${fadeClass}`}
      >
        <span className="font-mono text-sm tracking-tight">
          <span className="text-accent-gold">hasitha</span>
          <span className="text-text-muted">.dev</span>
        </span>

        <h1 className="mt-5 text-[34px] sm:text-[38px] leading-[1.1] font-semibold tracking-tight text-text-primary">
          Say hello,
          <br />
          or pitch me
          <br />
          something.
        </h1>
        <p className="mt-3.5 text-sm text-text-muted leading-relaxed">
          Roles, projects, technical questions. I read every message myself
          and reply personally.
        </p>

        {/* Liquid glass panel */}
        <div className="relative mt-9">
          {/* specular top highlight */}
          <div className="pointer-events-none absolute -top-px left-6 right-6 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
          <div
            className="rounded-[26px] p-6 sm:p-7 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(148,163,184,0.16)",
              boxShadow:
                "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 -1px 0 0 rgba(0,0,0,0.3) inset, 0 30px 80px -30px rgba(0,0,0,0.7), 0 0 40px -20px rgba(29,78,216,0.35)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5 relative">
              {/* Honeypot field */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label
                  htmlFor="name"
                  className="block text-[11px] font-mono tracking-wide text-text-muted uppercase mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-[#5b6b85] outline-none transition-all duration-200 focus:border-accent-gold/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-accent-gold/10"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-mono tracking-wide text-text-muted uppercase mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-[#5b6b85] outline-none transition-all duration-200 focus:border-accent-gold/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-accent-gold/10"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[11px] font-mono tracking-wide text-text-muted uppercase mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={5000}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-[#5b6b85] outline-none transition-all duration-200 focus:border-accent-gold/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-accent-gold/10 resize-none"
                  placeholder="What's on your mind?"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-accent-gold hover:bg-[#dab566] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-bg-primary font-medium text-sm rounded-xl px-4 py-2.5 transition-all duration-200 shadow-[0_8px_24px_-8px_rgba(201,162,75,0.55)]"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </div>

        {/* Social icon cards */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="group relative flex flex-col items-center justify-center gap-2 rounded-2xl py-4 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                backdropFilter: "blur(20px) saturate(160%)",
                WebkitBackdropFilter: "blur(20px) saturate(160%)",
                border: "1px solid rgba(148,163,184,0.14)",
                boxShadow: "0 1px 0 0 rgba(255,255,255,0.06) inset",
              }}
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${social.color}33 0%, transparent 70%)`,
                }}
              />
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 relative z-10 fill-text-muted transition-colors duration-200"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.fill = social.color)
                }
                onMouseLeave={(e) => (e.currentTarget.style.fill = "#94A3B8")}
              >
                {social.icon}
              </svg>
              <span className="relative z-10 text-[10px] font-mono tracking-wide text-[#5b6b85] group-hover:text-text-primary transition-colors duration-200">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-text-muted">
          © 2026 Hasitha Amarasinghe
        </p>
      </div>
    </PageShell>
  );
}
