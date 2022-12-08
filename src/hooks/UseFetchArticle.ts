import { useEffect, useState } from "react";
import { Article, Comment } from "../interfaces/articles";
import { ErrorInterface } from "../interfaces/base";
import { articlesApi } from "../services/articles";

export function UseFetchArticleWithComments(id: number) {
  const [data, setData] = useState<{
    article: Article;
    comments: Comment[];
  } | null>(null);
  const [error, setError] = useState<ErrorInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      articlesApi.fetchArticle(id),
      articlesApi.fetchArticleComments(id),
    ])
      .then((res: [Article, Comment[]]) => {
        setData({
          article: res[0],
          comments: res[1],
        });
        setLoading(false);
      })
      .catch((err: ErrorInterface) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return { data, error, loading };
}
