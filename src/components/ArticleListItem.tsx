import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContextProvider";
import BaseModal from "../hoc/BaseModal";
import { Article as ArticleInterface } from "../interfaces/articles";
import { setLocalDateTime, setDate } from "../utils/date";
import ArticleForm from "./ArticleForm";
import styles from "./ArticleListItem.module.scss";
import BaseModify from "./BaseModify";

const ArticleListItem = ({
  title,
  created_at,
  updated_at,
  body,
  id,
  category_id,
}: ArticleInterface) => {
  const { categoryData } = useContext(CategoryContext);
  const [isOpen, setIsOpen] = useState(false);

  const category = categoryData?.data?.data.find(
    (category) => category.id === category_id
  );
  const categoryName = category ? category.name : "-";
  const formData = { title, body, category_id, id };
  return (
    <li className={styles.article}>
      <div className={styles["img-container"]}>
        <p>{categoryName}</p>
      </div>
      <div className={styles.content}>
        <p className={styles.dates}>
          <span>Created: {setDate(created_at)}</span>
          <span>Last updated: {setLocalDateTime(updated_at)}</span>
        </p>
        <Link to={`/article/${id}`}>
          <h2>{title}</h2>
        </Link>
        <p className={styles.body}>{body}</p>
      </div>
      <BaseModify id={id} openForm={setIsOpen} type="article" />

      {isOpen ? (
        <BaseModal setIsOpen={setIsOpen}>
          <ArticleForm {...formData} type="edit" setIsOpen={setIsOpen} />
        </BaseModal>
      ) : (
        <></>
      )}
    </li>
  );
};

export default ArticleListItem;
