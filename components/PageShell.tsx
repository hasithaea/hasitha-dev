export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "var(--grid-size) var(--grid-size)",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, transparent 30%, black 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, transparent 30%, black 75%)",
        }}
      />

      {/* orbs */}
      <div
        className="pointer-events-none absolute w-105 h-105 rounded-full bg-orb-color-1/20 blur-[100px]"
        style={{ top: "-10%", left: "-10%", animation: "driftA 14s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute w-95 h-95 rounded-full bg-orb-color-2/20 blur-[100px]"
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

      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </main>
  );
}