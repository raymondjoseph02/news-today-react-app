// src/lib/news.ts
import { type DataProps } from "../types/types";

export interface NewsParams {
  category?: string;
  search?: string;
  pageSize?: number;
}

const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // For Vite
// const API_KEY = process.env.REACT_APP_NEWS_API_KEY; // For CRA

export async function fetchNews(params: NewsParams = {}): Promise<DataProps> {
  const { category = "general", search = "", pageSize = 20 } = params;

  if (!API_KEY) {
    throw new Error(
      "News API key missing. Please add VITE_NEWS_API_KEY to your .env file"
    );
  }

  let url: string;

  // If there's a search query, use /everything endpoint
  if (search && search.trim() !== "") {
    const baseUrl = "https://newsapi.org/v2/everything";
    url = `${baseUrl}?q=${encodeURIComponent(
      search.trim()
    )}&pageSize=${pageSize}`;
  } else {
    // For categories, use /top-headlines endpoint
    const baseUrl = "https://newsapi.org/v2/top-headlines";
    url = `${baseUrl}?country=us&pageSize=${pageSize}`;

    // Add category if it's not "all" or "general"
    if (category && category !== "all" && category !== "general") {
      const validCategories = [
        "business",
        "entertainment",
        "health",
        "science",
        "sports",
        "technology",
      ];

      const validCategory = validCategories.includes(category.toLowerCase())
        ? category.toLowerCase()
        : null;

      if (validCategory) {
        url += `&category=${validCategory}`;
      }
    }
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "NewsToday/1.0",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message || "News API error");
    }

    // Transform the API response to match our data structure
    return {
      status: data.status,
      totalResults: data.totalResults || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      articles: (data.articles || []).map((article: any) => ({
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        urlToImage: article.urlToImage,
        url: article.url,
        source: article.source,
        author: article.author,
        content: article.content,
      })),
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

// Utility function to get cached or fresh news data
export async function getNewsData(params: NewsParams = {}) {
  try {
    return await fetchNews(params);
  } catch {
    // Return empty data structure on error
    return {
      status: "error",
      totalResults: 0,
      articles: [],
    } as DataProps;
  }
}

// Cache implementation for React (optional)
const cache = new Map<string, { data: DataProps; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedNews(
  params: NewsParams = {}
): Promise<DataProps> {
  const cacheKey = JSON.stringify(params);
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetchNews(params);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}
