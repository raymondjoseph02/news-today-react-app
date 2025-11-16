import { type DataProps } from "../types/types";

export interface NewsParams {
  category?: string;
  search?: string;
  pageSize?: number;
  id?: string; // For fetching specific articles by ID
}

// WARNING: Client-side API keys are still visible to users in browser dev tools
// For production applications, implement a backend proxy to keep API keys secure
const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // For Vite
// const API_KEY = process.env.REACT_APP_NEWS_API_KEY; // For CRA

export async function fetchNews(params: NewsParams = {}): Promise<DataProps> {
  const { category = "general", search = "", pageSize = 10, id } = params;

  if (!API_KEY) {
    throw new Error(
      "NewsData API key missing. Please add VITE_NEWS_API_KEY to your .env file"
    );
  }

  let url: string;
  const baseUrl = "https://newsdata.io/api/1/latest";

  // Start with base URL (no API key in URL for security)
  url = baseUrl + "?";

  // If fetching by ID, only use the ID parameter
  if (id && id.trim() !== "") {
    url += `id=${encodeURIComponent(id.trim())}`;
  } else {
    // Add search query if provided
    if (search && search.trim() !== "") {
      url += `q=${encodeURIComponent(search.trim())}&`;
    }

    // Add country filter (US news)
    url += "country=us&";

    // Add language filter (English)
    url += "language=en";
  }

  // Only add category and page size filters when not fetching by specific ID
  if (!id || id.trim() === "") {
    // Add category if it's not "all" or "general"
    if (category && category !== "all" && category !== "general") {
      const validCategories = [
        "business",
        "entertainment",
        "health",
        "science",
        "sports",
        "technology",
        "politics",
      ];

      const validCategory = validCategories.includes(category.toLowerCase())
        ? category.toLowerCase()
        : null;

      if (validCategory) {
        url += `&category=${validCategory}`;
      }
    }

    // Add page size limit (free tier gets max 10 articles)
    if (pageSize && pageSize <= 10) {
      url += `&size=${pageSize}`;
    }
  }

  try {
    //  header-based authentication (keeps API key out of URL)
    const response = await fetch(url, {
      headers: {
        "User-Agent": "NewsToday/1.0",
        "X-ACCESS-KEY": API_KEY,
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return processApiResponse(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

// Helper function to process API response consistently
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function processApiResponse(data: any): DataProps {
  if (data.status === "error") {
    throw new Error(data.message || "NewsData API error");
  }

  // Transform NewsData.io API response to match our data structure
  return {
    status: data.status,
    totalResults: data.totalResults || 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    articles: (data.results || []).map((article: any) => ({
      title: article.title,
      description: article.description,
      publishedAt: article.pubDate,
      urlToImage: article.image_url,
      url: article.link,
      id: article.article_id,
      source: {
        id: article.source_id,
        name: article.source_name || article.source_id,
      },
      author: article.creator ? article.creator.join(", ") : null,
      content: article.content,
    })),
  };
}

// function to fetch a single article by ID
export async function fetchArticleById(articleId: string): Promise<DataProps> {
  return fetchNews({ id: articleId });
}
