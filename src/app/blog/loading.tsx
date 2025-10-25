export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center">
        {/* Skeleton Hero Section */}
        <div className="text-center mb-16 w-full max-w-4xl">
          <div className="inline-flex items-center px-4 py-2 bg-muted rounded-full mb-6 w-32 h-8 animate-pulse"></div>
          <div className="h-12 bg-muted rounded-lg mb-6 max-w-2xl mx-auto animate-pulse"></div>
          <div className="h-6 bg-muted rounded-lg max-w-2xl mx-auto animate-pulse"></div>
        </div>

        {/* Skeleton Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg border border-border p-6 animate-pulse">
              <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
              <div className="w-3/4 h-4 bg-muted rounded-lg mb-2"></div>
              <div className="w-1/2 h-3 bg-muted rounded-lg mb-4"></div>
              <div className="w-full h-3 bg-muted rounded-lg mb-2"></div>
              <div className="w-2/3 h-3 bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
