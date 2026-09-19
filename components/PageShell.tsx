export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary relative">
      {/* grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "var(--grid-size) var(--grid-size)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, transparent 25%, black 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, transparent 25%, black 75%)",
        }}
      />

      {/* orbs */}
      {/* top left - A */}
      <div
        className="pointer-events-none fixed w-140 h-140 rounded-full bg-orb-color-1/20 blur-[100px] z-0"
        style={{ top: "-15%", left: "-15%", animation: "driftA 14s ease-in-out infinite" }}
      />
      {/* bottom right - B */}
      <div
        className="pointer-events-none fixed w-130 h-130 rounded-full bg-orb-color-2/20 blur-[100px] z-0"
        style={{ bottom: "-15%", right: "-15%", animation: "driftB 16s ease-in-out infinite" }}
      />
      {/* top right - C */}
      <div
        className="pointer-events-none fixed w-125 h-125 rounded-full bg-orb-color-2/15 blur-[100px] z-0"
        style={{ top: "-15%", right: "-15%", animation: "driftC 18s ease-in-out infinite" }}
      />
      {/* bottom left - D */}
      <div
        className="pointer-events-none fixed w-125 h-125 rounded-full bg-orb-color-1/15 blur-[100px] z-0"
        style={{ bottom: "-15%", left: "-15%", animation: "driftD 15s ease-in-out infinite" }}
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
        @keyframes driftC {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 25px); }
        }
        @keyframes driftD {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, -20px); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes driftA { 0%, 100% { transform: none; } }
          @keyframes driftB { 0%, 100% { transform: none; } }
          @keyframes driftC { 0%, 100% { transform: none; } }
          @keyframes driftD { 0%, 100% { transform: none; } }
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center px-6">
        {children}
      </div>
    </main>
  );
}