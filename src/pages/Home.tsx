import Hero from "../components/news-feeds/Hero";
import RecentArticles from "../components/news-feeds/RecentArticles";
import { useNews } from "../hooks/useNews";

function Home() {
  const { data, isLoading, error } = useNews();

  return (
    <>
      <div className="min-h-[calc(100vh-100px)] bg-gray-50">
        <Hero data={data} isLoading={isLoading} error={error} />
        <RecentArticles data={data} isLoading={isLoading} error={error} />
      </div>
    </>
  );
}

export default Home;
