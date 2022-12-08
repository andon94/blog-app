import {
  CreateCategory,
  DeleteCategory,
  EditCategory,
} from "../interfaces/categories";
import { baseFetcher } from "./api";

class CategoriesAPI {
  baseFetcher: any;
  constructor(baseFetcher: any) {
    this.baseFetcher = baseFetcher;
  }

  fetchCategories() {
    return this.baseFetcher.get("/categories");
  }

  createCategory(data: CreateCategory) {
    return this.baseFetcher.post("/categories", data);
  }

  editCategory(data: EditCategory) {
    const { category_id, api_token } = data;
    return this.baseFetcher.put(
      `/articles/${category_id}?api_token=${api_token}`,
      data
    );
  }

  deleteCategory(data: DeleteCategory) {
    const { category_id, api_token } = data;
    return this.baseFetcher.delete(
      `/categories/${category_id}?api_token=${api_token}`
    );
  }
}

export const categoriesApi = new CategoriesAPI(baseFetcher);
