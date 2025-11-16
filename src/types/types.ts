export interface ArticleSource {
  id: string | null;
  name: string;
}

export interface ArticleProps {
  title: string;
  description: string | null;
  publishedAt: string;
  urlToImage: string | null;
  url: string;
  category?: string;
  source?: ArticleSource;
  author?: string | null;
  content?: string | null;
  id: string;
}

export interface DataProps {
  status: string;
  totalResults: number;
  articles: ArticleProps[];
}

export interface LinkProps {
  path: string;
  name: string;
}

export interface TabProps {
  name: string;
  abbreviation: string;
}

export interface NewsParams {
  category?: string;
  search?: string;
  pageSize?: number;
}

export interface SearchBarProps {
  placeHolder?: string;
  value?: string;
  setValue?: (val: string) => void;
  bg_color?: string;
  custom_class?: string;
}

export interface TabsComponentProps {
  tabs: TabProps[];
  activeTab: string;
  SetActiveTab: (tab: string) => void;
}

export interface CardProps {
  title: string;
  description: string | null;
  imageUrl: string | null;
  date: string;
  url: string;
}

export interface RelatedArticleCardProps {
  title: string;
  category: string;
  description: string | null;
  thumbNail: string | null;
  publishedAt?: string;
  url?: string;
}

export interface HeroProps {
  data: DataProps | null;
  isLoading: boolean;
  error: string | null;
}

export interface RecentArticlesProps {
  data: DataProps | null;
  isLoading: boolean;
  error: string | null;
}
