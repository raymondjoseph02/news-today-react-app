// app/loading.tsx
import ArticleSkeleton from "./skeleton/ArticleSkeleton";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-gray-50 pt-24 pb-10 sm:pt-28 sm:pb-16">
        <div className="container-wrapper space-y-12">
          <div className="space-y-9">
            {/* Search Bar Skeleton */}
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
            </div>

            {/* Tabs Skeleton */}
            <div className="hidden sm:flex gap-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="h-10 bg-gray-200 rounded-full w-16"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Article Skeleton */}
          <div className="animate-pulse">
            <div className="h-80 sm:h-96 bg-gray-400 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* Recent Articles Skeleton */}
      <section className="bg-gray-50 pb-10">
        <div className="container-wrapper space-y-6 sm:space-y-8">
          {/* Title Skeleton */}
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          </div>

          {/* Articles Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ArticleSkeleton key={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
