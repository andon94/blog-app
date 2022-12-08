export interface Article {
  body: string;
  category_id: number;
  created_at: string;
  id: number;
  title: string;
  updated_at: string;
  user_id: number;
  article_id: number;
}

export interface Comment {
  id: number;
  title: string;
  description: string;
  article_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Link {
  active: boolean;
  label: string;
  url: string;
}

export interface ArticlesResponse {
  current_page: number;
  data: Article[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ArticleLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface CreateArticle {
  title: string;
  body: string;
  category_id: number;
  api_token: string;
}

export interface DeleteArticle {
  article_id: number;
  api_token: string;
}

export interface EditArticle {
  title: string;
  body: string;
  category_id: number;
  article_id: number;
  api_token: string;
}
