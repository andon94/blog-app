import { Comment } from "../interfaces/articles";
import { setDate, setLocalDateTime } from "../utils/date";
import styles from "./ArticleContent.module.scss";

const ArticleComment = ({
  title,
  description,
  updated_at,
  created_at,
}: Comment) => {
  return (
    <div className={styles.comment}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <p className={styles.dates}>
        <span>Created: {setDate(created_at)}</span>
        <span>Last updated: {setLocalDateTime(updated_at)}</span>
      </p>
    </div>
  );
};

export default ArticleComment;
