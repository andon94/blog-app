import { ArticlesResponse } from "../interfaces/articles";
import ArticleListItem from "./ArticleListItem";
import styles from "./ArticleListItem.module.scss";
import BasePagination from "./BasePagination";

const ArticleList = (articleResponse: ArticlesResponse) => {
  const articles = articleResponse.data || [];
  return (
    <>
      <ul className={styles["article-list"]}>
        {articles.map((article, i) => (
          <ArticleListItem key={i} {...article} />
        ))}
      </ul>
      <BasePagination {...articleResponse} />
    </>
  );
};

export default ArticleList;
