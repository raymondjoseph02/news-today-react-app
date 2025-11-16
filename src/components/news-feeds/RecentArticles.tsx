import ArticleCard from "./ArticleCard";
import ArticleSkeleton from "../ui/skeleton/ArticleSkeleton";
import type { RecentArticlesProps, ArticleProps } from "../../types/types";

function RecentArticles({ data, isLoading, error }: RecentArticlesProps) {
  return (
    <section className="bg-gray-50 pb-10">
      <div className="container-wrapper space-y-6 sm:space-y-8">
        {data?.articles && data?.articles?.length > 0 && (
          <h2 className="text-gray-100 text-4xl md:text-5xl font-medium">
            Recent Articles
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, idx) => (
              <ArticleSkeleton key={`skeleton-${idx}`} />
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full py-11 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-gray-800">
                  Oops! Something went wrong 😕
                </p>
                <p className="text-gray-500">
                  Failed to get feeds. Please try again.
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 capitalize"
              >
                Reload
              </button>
            </div>
          ) : data?.articles?.length === 0 ? (
            // No articles found
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-center space-y-2">
              <p className="text-lg font-semibold text-gray-700">
                No articles found 😔
              </p>
              <p className="text-gray-500">
                Try changing your search or category
              </p>
            </div>
          ) : (
            // Articles
            data?.articles
              .slice(1)
              .map((article: ArticleProps) => (
                <ArticleCard
                  key={`${article.title}-${article.publishedAt}`}
                  title={article.title}
                  description={article.description || ""}
                  date={article.publishedAt}
                  imageUrl={article.urlToImage || ""}
                  id={article.id}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}

export default RecentArticles;
