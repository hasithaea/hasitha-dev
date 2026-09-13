import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* background grid */}
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

      {/* orbs */}
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
          <span className="inline-block text-2xl tracking-[0.3em] uppercase font-semibold px-3 py-1 -rotate-2 bg-[#1D4ED8] text-[#F8FAFC]">
            404
          </span>
          <h1 className="text-4xl font-semibold tracking-tight">
            <span className="text-[#F8FAFC]">Page not found</span>{" "}
            
          </h1>
          <p className="text-[#94A3B8] text-m">The link may be broken or the page has moved.</p>
        </div>

        <div>
          <Link
            href="/"
            className="group inline-flex items-center text-sm font-medium text-[#0B1220] rounded-full px-5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, #F4D06F 0%, #C9A24B 50%, #E8B33D 100%)",
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}