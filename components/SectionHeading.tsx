export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight mb-6">
      <span aria-hidden="true" className="h-5 w-px bg-accent" />
      {children}
    </h2>
  );
}