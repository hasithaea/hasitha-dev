"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex items-center justify-center px-4 relative overflow-hidden">
        <GridBackground />
        <div className="max-w-md w-full text-center relative">
          <span className="font-mono text-xs tracking-widest text-[#C9A24B] uppercase">
            Message sent
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-[#F8FAFC]">
            Thanks — I&apos;ll get back to you soon.
          </h1>
          <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
            A confirmation with a copy of your message is on its way to your
            inbox.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-8 text-sm text-[#94A3B8] hover:text-[#F8FAFC] underline underline-offset-4"
          >
            Send another message
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <GridBackground />
      <div className="max-w-md w-full relative">
        <span className="font-mono text-sm tracking-tight">
          <span className="text-[#C9A24B]">hasitha</span>
          <span className="text-[#94A3B8]">.dev</span>
        </span>
        <h1 className="mt-4 text-2xl font-semibold text-[#F8FAFC]">
          Get in touch
        </h1>
        <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
          Send a message and I&apos;ll reply from{" "}
          <span className="text-[#F8FAFC]">hello@hasitha.dev</span>. You&apos;ll
          get an email confirming what you sent.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Honeypot field — hidden from real users, bots often fill it in */}
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
              className="block text-xs font-mono tracking-wide text-[#94A3B8] uppercase mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              className="w-full bg-[#0f1829] border border-[#1d2c47] rounded-md px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#5b6b85] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/40 focus:border-[#C9A24B]/50 transition"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-mono tracking-wide text-[#94A3B8] uppercase mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={200}
              className="w-full bg-[#0f1829] border border-[#1d2c47] rounded-md px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#5b6b85] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/40 focus:border-[#C9A24B]/50 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-mono tracking-wide text-[#94A3B8] uppercase mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={5000}
              className="w-full bg-[#0f1829] border border-[#1d2c47] rounded-md px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#5b6b85] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/40 focus:border-[#C9A24B]/50 transition resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-[#C9A24B] hover:bg-[#dab566] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B1220] font-medium text-sm rounded-md px-4 py-2.5 transition"
          >
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </main>
  );
}

function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(29,78,216,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(29,78,216,0.18) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, transparent 30%, black 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, transparent 30%, black 75%)",
      }}
    />
  );
}
