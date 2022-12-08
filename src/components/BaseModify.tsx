import { useState, useContext } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { ArticlesContext } from "../context/ArticlesContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import { CategoryContext } from "../context/CategoryContextProvider";
import { PopupContext } from "../context/PopupContextProvider";
import { Article } from "../interfaces/articles";
import { ErrorInterface } from "../interfaces/base";
import { Category } from "../interfaces/categories";
import { articlesApi } from "../services/articles";
import { categoriesApi } from "../services/categories";
import styles from "./ArticleListItem.module.scss";

const BaseModify = ({
  id,
  openForm,
  type,
}: {
  id: number;
  openForm: (open: boolean) => void;
  type: "article" | "category";
}) => {
  const { token } = useContext(AuthContext);
  const { fetchArticles } = useContext(ArticlesContext);
  const { fetchCategories } = useContext(CategoryContext);
  const { setPopup } = useContext(PopupContext);

  const location = useLocation();
  const { pathname } = location;

  const [isOpen, setIsOpen] = useState(false);

  const handleItem = (action: "edit" | "delete") => {
    setIsOpen(false);

    if (type === "article") {
      if (action === "edit") openForm(true);
      if (action === "delete") {
        articlesApi
          .deleteArticle({
            article_id: id,
            api_token: token,
          })
          .then((_res: { data: Article }) => {
            fetchArticles();
            setIsOpen(false);
            setPopup("Article deleted!");
          })
          .catch((err: ErrorInterface) => {
            console.log(err);
            setPopup("Error!");
          });
      }
    }

    if (type === "category") {
      if (action === "edit") openForm(true);
      if (action === "delete") {
        categoriesApi
          .deleteCategory({
            category_id: id,
            api_token: token,
          })
          .then((_res: { data: Category }) => {
            fetchCategories();
            setIsOpen(false);
            setPopup("Category deleted!");
          })
          .catch((err: ErrorInterface) => {
            console.log(err);
            setPopup("Error!");
          });
      }
    }
  };

  if (pathname !== "/admin-dashboard") return <></>;
  return (
    <div className={styles["base-modify"]}>
      <button className={styles.icon} onClick={() => setIsOpen(!isOpen)}>
        <HiDotsVertical />
      </button>
      {isOpen ? (
        <div className={styles.toolbar}>
          <ul>
            <li onClick={() => handleItem("edit")}>{`Edit ${type}`}</li>
            <li onClick={() => handleItem("delete")}>{`Delete ${type}`}</li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BaseModify;
