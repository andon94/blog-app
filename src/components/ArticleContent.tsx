import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContextProvider";
import { Article, Comment } from "../interfaces/articles";
import { setDate, setLocalDateTime } from "../utils/date";
import ArticleComment from "./ArticleComment";
import styles from "./ArticleContent.module.scss";

type ArticleContentType = {
  article: {
    data: Article;
  };
  comments: {
    data: Comment[];
  };
};

const ArticleContent = ({ comments, article }: ArticleContentType) => {
  const navigate = useNavigate();
  const { body, created_at, title, updated_at, category_id } = article.data;
  const commentsData = comments.data;

  const { categoryData } = useContext(CategoryContext);
  const category = categoryData?.data?.data.find(
    (category) => category.id === category_id
  );
  const categoryName = category ? category.name : "-";

  return (
    <article className={styles["article-content"]}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        back
      </button>
      <div className={styles["img-container"]}>
        <p>{categoryName}</p>
      </div>
      <p className={styles.dates}>
        <span>Created: {setDate(created_at)}</span>
        <span>Last updated: {setLocalDateTime(updated_at)}</span>
      </p>
      <h2>{title}</h2>
      <p className={styles.body}>{body}</p>
      <div className={styles["comments-container"]}>
        <h3>Comments:</h3>
        {commentsData.map((comment, i) => (
          <ArticleComment {...comment} key={i} />
        ))}
      </div>
    </article>
  );
};

export default ArticleContent;
