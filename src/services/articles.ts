import {
  CreateArticle,
  DeleteArticle,
  EditArticle,
} from "../interfaces/articles";
import { baseFetcher } from "./api";

class ArticlesAPI {
  baseFetcher: any;
  constructor(baseFetcher: any) {
    this.baseFetcher = baseFetcher;
  }

  fetchArticles() {
    return this.baseFetcher.get("/articles");
  }

  fetchArticlesPaged(page: number) {
    if (page) return this.baseFetcher.get(`/articles?page=${page}`);
  }

  fetchArticle(id: number) {
    return this.baseFetcher.get(`/articles/${id}`);
  }

  fetchArticleComments(id: number) {
    return this.baseFetcher.get(`/articles/${id}/comments`);
  }

  createArticle(data: CreateArticle) {
    return this.baseFetcher.post("/articles", data);
  }

  editArticle(data: EditArticle) {
    const { article_id, api_token } = data;
    return this.baseFetcher.put(
      `/articles/${article_id}?api_token=${api_token}`,
      data
    );
  }

  deleteArticle(data: DeleteArticle) {
    const { article_id, api_token } = data;
    return this.baseFetcher.delete(
      `/articles/${article_id}?api_token=${api_token}`,
      data
    );
  }
}

export const articlesApi = new ArticlesAPI(baseFetcher);
