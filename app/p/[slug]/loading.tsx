export default function Loading() {
  return (
    <article className="min-h-screen hero-gradient">
      {/* Hero Section Skeleton */}
      <div className="relative">
        <div className="relative container mx-auto px-4 py-16">
          {/* Back Button Skeleton */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <div className="w-24 h-4 bg-muted rounded"></div>
          </div>

          <div className="space-y-6">
            {/* Badges Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-6 bg-muted rounded-full"></div>
              <div className="w-24 h-6 bg-muted rounded-full"></div>
            </div>

            {/* Title Skeleton */}
            <div className="space-y-4">
              <div className="h-12 bg-muted rounded-lg w-3/4"></div>
              <div className="h-12 bg-muted rounded-lg w-1/2"></div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded w-full"></div>
              <div className="h-6 bg-muted rounded w-5/6"></div>
            </div>

            {/* Metadata Skeleton */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border/50">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <div className="w-20 h-4 bg-muted rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <div className="w-24 h-4 bg-muted rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <div className="w-16 h-4 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Article content skeleton */}
            <div className="space-y-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </div>
              ))}
            </div>

            {/* Paragraphs with varying lengths */}
            <div className="space-y-6 mt-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-11/12"></div>
                  <div className="h-4 bg-muted rounded w-10/12"></div>
                  <div className="h-4 bg-muted rounded w-9/12"></div>
                </div>
              ))}
            </div>

            {/* Headings and content blocks */}
            <div className="space-y-8 mt-12">
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded-lg w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-6 bg-muted rounded-lg w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-11/12"></div>
                  <div className="h-4 bg-muted rounded w-9/12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
