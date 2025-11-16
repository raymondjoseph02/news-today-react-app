import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  id: string;
}
function ArticleCard({
  title,
  description,
  imageUrl,
  date,
  id,
}: CardProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {

    // Navigate directly to the article page
    navigate(`/news/${id}`);
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
