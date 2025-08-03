export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Featured Card Skeleton */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl p-8 border border-border/50 animate-pulse">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-primary/10 w-16 h-6 rounded-full"></div>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="h-8 bg-muted rounded-lg w-3/4"></div>
                  <div className="h-8 bg-muted rounded-lg w-1/2"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-muted rounded"></div>
                    <div className="w-20 h-4 bg-muted rounded"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-muted rounded"></div>
                    <div className="w-24 h-4 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="w-32 h-10 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid Skeleton */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 bg-muted rounded-lg w-48"></div>
            <div className="h-6 bg-muted rounded-lg w-32"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-6 border border-border/50 animate-pulse"
              >
                <div className="space-y-4">
                  <div className="w-16 h-6 bg-muted rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-muted rounded w-full"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-muted rounded"></div>
                      <div className="w-16 h-4 bg-muted rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-muted rounded"></div>
                      <div className="w-20 h-4 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
