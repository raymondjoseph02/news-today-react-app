import { useNavigate } from "react-router-dom";
import { useStore } from "@tanstack/react-store";
import { activeTab } from "../../store";
interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  url: string;
}
function ArticleCard({ title, description, imageUrl, date, url }: CardProps) {
  const navigate = useNavigate();
  const currentTab = useStore(activeTab);

  // Map tab names to valid API categories
  const mapTabToCategory = (tabName: string) => {
    const mapping: { [key: string]: string } = {
      All: "general",
      Top: "general",
      World: "general",
      Politics: "general", // Politics not supported by API, fallback to general
      Business: "business",
      Tech: "technology",
    };
    return mapping[tabName] || "general";
  };

  // Create URL-safe slug from title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNavigate = () => {
    const slug = createSlug(title);

    // Store article data in sessionStorage for the single page to access
    const articleData = {
      title,
      description,
      urlToImage: imageUrl,
      publishedAt: date,
      url,
      category: mapTabToCategory(currentTab),
    };

    sessionStorage.setItem(`article-${slug}`, JSON.stringify(articleData));

    // Navigate to the article page
    navigate(`/news/${slug}`);
  };

  return (
    <div
      onClick={handleNavigate}
      aria-label={`/news/${title}`}
      className="space-y-6 group"
    >
      <div className="rounded-lg w-full max-h-60 h-60 bg-gray-500 overflow-hidden">
        <img
          src={imageUrl || "/images/placeholder.jpg"}
          alt={title}
          className="object-cover size-full group-hover:scale-105 transition ease-in-out duration-300 "
        />
      </div>
      <div>
        <div className="space-y-2.5">
          <p className="line-clamp-2 text-lg font-semibold sm:text-2xl text-gray-100">
            {title}
          </p>
          <p className="text-gray-500 text-lg line-clamp-2">
            {description ?? "No description available at the moment "}
          </p>
        </div>
        <time>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
    </div>
  );
}

export default ArticleCard;
