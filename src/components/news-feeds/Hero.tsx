// src/components/news-feeds/Hero.tsx
import { useStore } from "@tanstack/react-store";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback, memo } from "react";
import SearchBar from "../ui/SearchBar";
import Tab from "../ui/Tab";
import {
  activeTab,
  handleSearch,
  resetSearch,
  search,
  updateActiveTab,
} from "../../store";
import ArticleSkeleton from "../ui/skeleton/ArticleSkeleton";
import type { ArticleProps, HeroProps } from "../../types/types";
import { testEndpoint } from "../../lib/news";

function Hero({ data, isLoading, error }: HeroProps) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Memoize static data to prevent re-creation
  const tabs = useMemo(
    () => [
      { name: "All", abbreviation: "all" },
      { name: "Top", abbreviation: "top stories" },
      { name: "World", abbreviation: "world" },
      { name: "Politics", abbreviation: "politics" },
      { name: "Business", abbreviation: "business" },
      { name: "Tech", abbreviation: "technology" },
    ],
    []
  );

  testEndpoint();

  const currentTab = useStore(activeTab);
  const currentSearch = useStore(search);

  // Memoize mapping object to prevent re-creation
  const tabToCategoryMapping = useMemo(
    () => ({
      all: "general",
      top: "top stories",
      world: "world",
      politics: "politics",
      business: "business",
      tech: "technology",
    }),
    []
  );

  // Memoize callback functions to prevent re-renders
  const handleTabSelect = useCallback((tabName: string) => {
    resetSearch();
    updateActiveTab(tabName);
    setIsDropdownOpen(false);
  }, []);

  const getCurrentTabDisplayName = useMemo(() => {
    const tab = tabs.find(
      (t) => t.name.toLowerCase() === currentTab.toLowerCase()
    );
    return tab ? tab.name : "All";
  }, [tabs, currentTab]);

  // Memoize utility functions
  const createSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }, []);

  const mapTabToCategory = useCallback(
    (tabName: string) => {
      return (
        tabToCategoryMapping[
          tabName.toLowerCase() as keyof typeof tabToCategoryMapping
        ] || "general"
      );
    },
    [tabToCategoryMapping]
  );

  const handleHeroNavigate = useCallback(
    (item: ArticleProps) => {
      const slug = createSlug(item.title);

      // Store article data in sessionStorage with current category
      const articleData = {
        title: item.title,
        description: item.description,
        urlToImage: item.urlToImage,
        publishedAt: item.publishedAt,
        url: item.url,
        category: mapTabToCategory(currentTab),
        author: item.author,
        content: item.content,
        source: item.source,
      };

      sessionStorage.setItem(`article-${slug}`, JSON.stringify(articleData));

      // Navigate to the article page
      navigate(`/news/${slug}`);
    },
    [createSlug, mapTabToCategory, currentTab, navigate]
  );

  // Memoize search handler to prevent re-renders
  const handleSearchChange = useCallback((val: string) => {
    handleSearch(val);
  }, []);

  return (
    <section className="bg-gray-50 pt-24 pb-10 sm:pt-28 sm:pb-16">
      <div className="container-wrapper space-y-12">
        <div className="space-y-9">
          <SearchBar
            value={currentSearch ?? ""}
            setValue={handleSearchChange}
            custom_class="!border-gray-100/20 !border"
            placeHolder="search for news, topics..."
          />

          {/* Desktop Tabs */}
          <div className="hidden sm:flex">
            <Tab
              tabs={tabs}
              activeTab={currentTab}
              SetActiveTab={handleTabSelect}
            />
          </div>

          {/* Mobile Dropdown */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            >
              <span className="text-gray-700 font-medium">
                {getCurrentTabDisplayName}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {tabs.map((tab) => (
                  <button
                    key={tab.abbreviation}
                    onClick={() => handleTabSelect(tab.name)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150 ${
                      currentTab.toLowerCase() === tab.name.toLowerCase()
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            )}

            {/* Backdrop to close dropdown */}
            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
            )}
          </div>
        </div>

        <div>
          {isLoading ? (
            // Show skeleton loading state
            <div className="w-full h-full flex items-center justify-center">
              <ArticleSkeleton />
            </div>
          ) : error ? (
            // Show error state
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-semibold text-gray-800">
                Failed to load news 😕
              </p>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : data?.articles?.length ? (
            data.articles.slice(0, 1).map((item) => (
              <div
                style={{
                  backgroundImage: `url(${item.urlToImage})`,
                }}
                className="p-6 sm:px-8 sm:py-5 h-80 sm:h-151 md:px-10 md:py-8 bg-gray-400 rounded-xl flex items-start justify-end flex-col bg-cover bg-center relative overflow-hidden cursor-pointer"
                key={`hero-${item.title}-${item.publishedAt}`}
                onClick={() => handleHeroNavigate(item)}
              >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="relative z-20">
                  <h3 className="text-white font-bold text-4xl md:text-6xl line-clamp-3 text-pretty mb-4">
                    {item.title}
                  </h3>
                  <p className="sm:text-lg font-medium text-gray-200 max-w-3xl line-clamp-3 mb-2">
                    {item.description ?? "No description available"}
                  </p>
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeroNavigate(item);
                      }}
                      className="bg-blue-300 rounded-lg px-6 py-3 font-semibold text-white cursor-pointer hover:bg-blue-300/80 transition ease-in-out duration-300 inline-block"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No news found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
