import { useEffect, useState, useMemo, useCallback } from "react";
import { useStore } from "@tanstack/react-store";
import { activeTab, search } from "../store/index";
import { debounce } from "../utils/debounce";
import { fetchNews, type NewsParams } from "../lib/news";
import { type DataProps } from "../types/types";

// Hook for news fetching
export function useNews(initialData?: DataProps | null) {
  const [data, setData] = useState<DataProps | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  const currentTab = useStore(activeTab) as string;
  const currentSearch = useStore(search) as string | undefined;
  const searchQuery = currentSearch || "";

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

  const category = mapTabToCategory(currentTab || 'All');

  const fetchNewsData = useCallback(async (params: NewsParams) => {
    try {
      setError(null);
      setIsLoading(true);
      const newsData = await fetchNews(params);
      setData(newsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch news");
      console.error("Error fetching news:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetch = useMemo(
    () =>
      debounce(() => {
        fetchNewsData({
          category,
          search: searchQuery || undefined,
          pageSize: 20,
        });
      }, 900),
    [category, searchQuery, fetchNewsData]
  );

  const refetch = useCallback(() => {
    fetchNewsData({
      category,
      search: searchQuery || undefined,
      pageSize: 20,
    });
  }, [category, searchQuery, fetchNewsData]);

  useEffect(() => {
    // Always fetch when category or search changes
    debouncedFetch();
  }, [debouncedFetch]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}

// Hook for static data (if needed for SSG-like behavior)
export function useNewsStatic(initialData: DataProps) {
  return {
    data: initialData,
    isLoading: false,
    error: null,
    refetch: () => {},
  };
}
