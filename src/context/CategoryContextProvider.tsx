import { createContext, useEffect, useState } from "react";
import { ErrorInterface } from "../interfaces/base";
import { CategoryResponse } from "../interfaces/categories";
import { Children } from "../interfaces/context";
import { categoriesApi } from "../services/categories";

export const CategoryContext = createContext<{
  categoryData: {
    data: CategoryResponse | null;
    error: null;
    loading: boolean;
  };
  fetchCategories: () => void;
}>({
  categoryData: {
    data: null,
    error: null,
    loading: true,
  },
  fetchCategories: () => null,
});

const CategoryContextProvider = ({ children }: Children) => {
  const [categoryData, setCategoryData] = useState<any>();

  const fetchCategories = () => {
    categoriesApi
      .fetchCategories()
      .then((res: CategoryResponse) => {
        setCategoryData({ data: res, error: null, loading: false });
      })
      .catch((err: ErrorInterface) => {
        setCategoryData({ data: null, error: err, loading: false });
      });
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CategoryContext.Provider value={{ categoryData, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
