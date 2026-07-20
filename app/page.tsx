"use client";

import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaDiscord,
  FaDocker,
} from "react-icons/fa6";

export default function ComingSoon() {
  const mailUser = "hello";
  const mailDomain = "hasitha.dev";

  const socials = [
    { name: "GitHub", href: "https://github.com/hasithaea", Icon: FaGithub },
    { name: "LinkedIn", href: "https://linkedin.com/in/hasithaea", Icon: FaLinkedin },
    { name: "Docker Hub", href: "https://hub.docker.com/u/hasithaea", Icon: FaDocker },
    { name: "X", href: "https://x.com/hasithaea", Icon: FaXTwitter },
    { name: "Discord", href: "https://discord.com/users/hasithaea", Icon: FaDiscord },
  ];

  return (
    <main className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* background */}
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

      {/* center */}
      <div
        className="pointer-events-none absolute w-105 h-105 rounded-full bg-[#1D4ED8]/20 blur-[100px]"
        style={{ top: "-10%", left: "-10%", animation: "driftA 14s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute w-95 h-95 rounded-full bg-[#1E40AF]/20 blur-[100px]"
        style={{ bottom: "-10%", right: "-10%", animation: "driftB 16s ease-in-out infinite" }}
      />

      <style>{`
        @keyframes driftA {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 20px); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-25px, -15px); }
        }
      `}</style>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <div className="space-y-3">
          <span className="inline-block text-xs tracking-[0.3em] uppercase font-semibold px-3 py-1 -rotate-2 bg-[#1D4ED8] text-[#F8FAFC]">
            Coming Soon
          </span>
          <h1 className="text-4xl font-semibold tracking-tight">
            <span className="text-[#C9A24B]">hasitha</span>
            <span className="text-[#94A3B8]">.dev</span>
          </h1>
          <p className="text-[#94A3B8] text-lg">
            Building, deliberately.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="group relative p-3 rounded-full border border-[#334155] bg-[#111827] transition-all duration-300 hover:border-[#2563EB] hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 rounded-full bg-[#2563EB]/0 group-hover:bg-[#2563EB]/20 blur-md transition-all duration-300" />
              <Icon className="w-5 h-5 relative z-10 text-[#94A3B8] group-hover:text-[#2563EB] transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* email and  name */}
        <a
          href={"mailto:" + mailUser + "@" + mailDomain}
          className="group inline-flex items-center text-sm font-medium text-[#0B1220] rounded-full px-5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #F4D06F 0%, #C9A24B 50%, #E8B33D 100%)",
          }}
        >
          <span>{mailUser}<span aria-hidden="true">@</span>{mailDomain}</span>
        </a>

        <p className="text-sm text-[#94A3B8]">© 2026 Hasitha Amarasinghe</p>
      </div>
    </main>
  );
}