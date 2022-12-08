import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticlesResponse } from "../interfaces/articles";
import { ErrorInterface } from "../interfaces/base";
import { Children } from "../interfaces/context";
import { articlesApi } from "../services/articles";

export const ArticlesContext = createContext<{
  articlesData: {
    data: ArticlesResponse | null;
    error: null;
    loading: boolean;
  };
  fetchArticles: () => void;
}>({
  articlesData: {
    data: null,
    error: null,
    loading: true,
  },
  fetchArticles: () => null,
});

const ArticlesContextProvider = ({ children }: Children) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));

  const [articlesData, setArticlesData] = useState<any>();

  const fetchArticles = () => {
    articlesApi
      .fetchArticlesPaged(page || 1)
      .then((res: ArticlesResponse) => {
        setArticlesData({ data: res, error: null, loading: false });
      })
      .catch((err: ErrorInterface) => {
        setArticlesData({ data: null, error: err, loading: false });
      });
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <ArticlesContext.Provider value={{ articlesData, fetchArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContextProvider;
