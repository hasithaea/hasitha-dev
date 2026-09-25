import PageShell from "@/components/PageShell";
import Button from "@/components/Button";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <PageShell footer={<Footer variant="compact" />}>
      <div className="flex-1 w-full flex items-center justify-center py-20">
        <div className="max-w-md w-full text-center space-y-8">
          
          <div className="space-y-4">
            <span className="inline-block font-mono text-xl tracking-[0.3em] uppercase font-bold px-4 py-1.5 -rotate-2 bg-accent text-bg-primary">
              404
            </span>
            <h1 className="text-4xl font-semibold tracking-tight">
              <span className="text-text-primary">Page not found</span>
            </h1>
            <p className="text-text-muted text-base">
              The link may be broken or the page has been moved.
            </p>
          </div>

          <div>
            <Button href="/">Back to home</Button>
          </div>

        </div>
      </div>
    </PageShell>
  );
}