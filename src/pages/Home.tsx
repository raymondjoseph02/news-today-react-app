// src/pages/Home.tsx
// import { Helmet } from 'react-helmet-async';
import Hero from "../components/news-feeds/Hero";
import RecentArticles from "../components/news-feeds/RecentArticles";
import { useNews } from "../hooks/useNews";

function Home() {
  const { data, isLoading, error } = useNews();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-100px)] bg-gray-50">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-300"></div>
        </div>
      </div>
    );
  }

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
