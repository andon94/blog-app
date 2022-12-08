import { Link } from "./articles";

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  current_page: number;
  data: Category[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: number | null;
  to: number;
  total: number;
  links: Link[];
  last_page: number;
}

export interface CreateCategory {
  name: string;
  description: string;
  id: number;
  api_token: string;
}

export interface DeleteCategory {
  category_id: number;
  api_token: string;
}

export interface EditCategory {
  name: string;
  description: string;
  category_id: number;
  api_token: string;
}
