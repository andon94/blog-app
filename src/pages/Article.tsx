import { useParams } from "react-router-dom";
import ArticleContent from "../components/ArticleContent";
import { BaseResponse } from "../hoc/BaseResponse";
import { UseFetchArticleWithComments } from "../hooks/UseFetchArticle";

const Article = () => {
  const params = useParams();
  const articleId = Number(params.id);

  const { data, loading, error } = UseFetchArticleWithComments(articleId);

  const Content = BaseResponse(ArticleContent, {
    data,
    loading,
    error,
  });

  return <Content />;
};

export default Article;
