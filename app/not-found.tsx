import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-3">
          <span className="inline-block text-2xl tracking-[0.3em] uppercase font-semibold px-3 py-1 -rotate-2 bg-orb-color-1 text-text-primary">
            404
          </span>
          <h1 className="text-4xl font-semibold tracking-tight">
            <span className="text-text-primary">Page not found</span>
          </h1>
          <p className="text-text-muted text-base">The link may be broken or the page has moved.</p>
        </div>

        <div>
          <Link
            href="/"
            className="group inline-flex items-center text-sm font-medium text-bg-primary rounded-full px-5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, #F4D06F 0%, #C9A24B 50%, #E8B33D 100%)",
            }}
          >
            Back to home
          </Link>
        </div>
        
        <p className="text-sm text-text-muted">
            © 2026 Hasitha Amarasinghe
        </p>

      </div>
    </PageShell>
  );
}