import PageShell from "@/components/PageShell";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <PageShell>
      <div className="min-h-screen w-full flex items-center justify-center">
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
            <Button href="/">Back to home</Button>
          </div>

          <p className="text-sm text-text-muted">
              © 2026 Hasitha Amarasinghe
          </p>
        </div>
      </div>
    </PageShell>
  );
}