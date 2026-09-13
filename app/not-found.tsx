import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0c1938] px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 text-center shadow-2xl">


        <p className="text-sm tracking-widest text-white/40 uppercase mb-2">
          404
        </p>
        <h1 className="text-2xl font-semibold text-white mb-3">
          Page not found
        </h1>
        <p className="text-white/60 text-sm mb-8">
          The page you're looking for doesn't exist or has moved.
        </p>

        <Link
          href="/"
          >
          Back to home
        </Link>
      </div>
    </main>
  );
}