export default function PageShell({
  children,
  footer,
  width = "narrow",
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: "narrow" | "site";
}) {
  const site = width === "site";

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary relative flex flex-col">
      <div
        className={`relative z-10 flex flex-1 flex-col ${site ? "" : "items-center px-6"}`}
      >
        <div
          className={
            site
              ? "container-site flex flex-1 flex-col"
              : "w-full max-w-4xl flex flex-1 flex-col"
          }
        >
          {children}
        </div>
      </div>
      {footer && <div className="relative z-10 mt-auto">{footer}</div>}
    </main>
  );
}