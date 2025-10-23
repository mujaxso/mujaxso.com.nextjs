export default function ProjectsLoading() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Skeleton Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[var(--color-primary)]/10 rounded-full mb-6 w-32 h-8 animate-pulse"></div>
          <div className="h-12 bg-[var(--color-muted)] rounded-lg mb-6 max-w-2xl mx-auto animate-pulse"></div>
          <div className="h-6 bg-[var(--color-muted)] rounded-lg max-w-2xl mx-auto animate-pulse"></div>
        </div>

        {/* Skeleton Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] p-6 animate-pulse">
              <div className="h-40 bg-[var(--color-muted)] rounded-lg mb-4"></div>
              <div className="h-6 bg-[var(--color-muted)] rounded-lg mb-2"></div>
              <div className="h-4 bg-[var(--color-muted)] rounded-lg mb-4 w-3/4"></div>
              <div className="h-4 bg-[var(--color-muted)] rounded-lg mb-2"></div>
              <div className="h-4 bg-[var(--color-muted)] rounded-lg w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
