export default function PageShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary relative flex flex-col">
      <div className="relative z-10 flex flex-1 flex-col items-center px-6">
        <div className="w-full max-w-4xl flex flex-1 flex-col">{children}</div>
      </div>
      {footer && <div className="relative z-10 mt-auto">{footer}</div>}
    </main>
  );
}