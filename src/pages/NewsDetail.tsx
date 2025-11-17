import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Archive, Heart, MessageSquare, Share2 } from "lucide-react";
import { type ArticleProps } from "../types/types";
import { fetchNews, fetchArticleById } from "../lib/news";
import RelatedArticleCard from "../components/news-feeds/RelatedArticleCard";
import Comments from "../components/news-feeds/Comments";
// import fallBackImage from "/images/freepik__adjust__20029.jpeg";

function NewsDetail() {
  const params = useParams();
  // const navigate = useNavigate();
  const { slug } = params;
  const [article, setArticle] = useState<ArticleProps | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRelatedArticles = useCallback(
    async (category: string, currentArticleTitle: string) => {
      try {
        // Ensure using a valid API category
        const validCategories = [
          "business",
          "entertainment",
          "general",
          "health",
          "science",
          "sports",
          "technology",
        ];
        const apiCategory = validCategories.includes(category.toLowerCase())
          ? category.toLowerCase()
          : "general";

        const relatedData = await fetchNews({
          category: apiCategory,
          pageSize: 6,
        });

        // Filter out the current article and get first 2 different articles
        const related = relatedData.articles
          .filter((article) => article.title !== currentArticleTitle)
          .slice(0, 2);
        setRelatedArticles(related);
      } catch (err) {
        console.error("Error fetching related articles:", err);
      }
    },
    []
  );

  const fetchArticle = useCallback(async () => {
    if (!slug) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch article directly by ID
      console.log("Fetching article by ID:", slug);
      const articleResponse = await fetchArticleById(slug);

      if (articleResponse.articles && articleResponse.articles.length > 0) {
        const fetchedArticle = articleResponse.articles[0];
        setArticle(fetchedArticle);

        // Fetch related articles based on a default category or extract from article data
        await fetchRelatedArticles("general", fetchedArticle.title);
      } else {
        setError("Article not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [slug, fetchRelatedArticles]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (isLoading) {
    return (
      <div className="container-wrapper pt-40 pb-10 min-h-screen w-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-300"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container-wrapper pt-20 pb-10 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-500 mb-6">{error || "Article not found"}</p>
          <Link
            to="/"
            className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/80 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <article className="container-wrapper pt-20 sm:pt-40 pb-10 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <p className="text-gray-500 capitalize mb-2">
              news / {article?.category || "general"}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center text-gray-500 text-sm mb-6 gap-3">
              <div>
                <p className="capitalize">
                  by {article.author || "Unknown Author"}
                </p>
              </div>
              <div className="size-1 rounded-full bg-gray-500" />
              <div className="flex gap-1 items-center">
                <p className="capitalize">published on </p>
                <time>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </header>

          {/* Article Image */}
          <div className="mb-8">
            <img
              src={article.urlToImage ?? ""}
              alt={article.title}
              className="w-full h-64 md:h-144 object-cover rounded-lg bg-gray-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
              }}
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {article.description || "No description available"}
            </p>
          </div>

          {/* Article Statistics */}
          <div className="flex items-center justify-center gap-10 border-y border-y-gray-200 py-4 my-8">
            <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
              <Heart className="text-gray-500" />
              <p>1.3k</p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
              <MessageSquare className="text-gray-500" />
              <p>3</p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-500 transition">
              <Archive className="text-gray-500" />
              <p>save</p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-purple-500 transition">
              <Share2 className="text-gray-500" />
              <p>share</p>
            </div>
          </div>

          {/* Related Articles */}
          <div className="my-6">
            <p className="font-semibold text-lg sm:text-2xl mb-4">
              Related Articles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedArticles.length > 0 ? (
                relatedArticles.map((relatedArticle, index) => (
                  <RelatedArticleCard
                    key={relatedArticle.title + index}
                    thumbNail={relatedArticle.urlToImage ?? ""}
                    category={relatedArticle.category ?? "no category found"}
                    description={
                      relatedArticle.description || "no description found"
                    }
                    publishedAt={relatedArticle.publishedAt}
                    title={relatedArticle.title}
                    url={relatedArticle.url}
                    id={relatedArticle.id}
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-2">
                  No related articles available
                </p>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="my-8">
            <h2 className="font-semibold text-lg sm:text-2xl mb-6">Comments</h2>
            <Comments articleId={slug} />
          </div>
        </div>
      </article>
    </>
  );
}

export default NewsDetail;
