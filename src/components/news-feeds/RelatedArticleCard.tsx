import { useNavigate } from "react-router-dom";
interface RelatedArticleCardProps {
  title: string;
  category: string;
  description: string;
  thumbNail: string;
  publishedAt?: string;
  url?: string;
}
function RelatedArticleCard({
  title,
  description,
  category,
  thumbNail,
  publishedAt,
  url,
}: RelatedArticleCardProps) {
  const navigate = useNavigate();

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNavigate = () => {
    const slug = createSlug(title);

    const articleData = {
      title,
      description,
      urlToImage: thumbNail,
      publishedAt: publishedAt || new Date().toISOString(),
      url: url || "",
      category: category,
    };

    sessionStorage.setItem(`article-${slug}`, JSON.stringify(articleData));
    navigate(`/news/${slug}`);
  };

  return (
    <div className="cursor-pointer" onClick={handleNavigate}>
      <div className="flex gap-4 mb-2 flex-col sm:flex-row">
        <div className="flex-1">
          <div className="mb-2">
            <p className="text-sm text-blue-300 font-medium capitalize mb-1">
              {category}
            </p>
            <p className="font-semibold text-gray-800 line-clamp-2">{title}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
        <div className="w-full sm:w-36 h-33">
          <img
            src={thumbNail || "/images/placeholder.jpg"}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <button
        className="text-blue-300 hover:text-blue-500 cursor-pointer text-sm font-medium transition"
        onClick={(e) => {
          e.stopPropagation();
          handleNavigate();
        }}
      >
        Read More
      </button>
    </div>
  );
}

export default RelatedArticleCard;
