import styles from "./ArticleForm.module.scss";
import BaseButton from "./BaseButton";
import { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContextProvider";
import { articlesApi } from "../services/articles";
import { AuthContext } from "../context/AuthContextProvider";
import { ArticlesContext } from "../context/ArticlesContextProvider";
import { Article } from "../interfaces/articles";
import { ErrorInterface } from "../interfaces/base";
import { PopupContext } from "../context/PopupContextProvider";

const ArticleForm = ({
  title = "",
  body = "",
  category_id = 0,
  id,
  type,
  setIsOpen,
}: {
  title?: string;
  body?: string;
  category_id?: number;
  id?: number;
  type: "edit" | "create";
  setIsOpen: (close: boolean) => void;
}) => {
  const { token } = useContext(AuthContext);
  const { categoryData } = useContext(CategoryContext);
  const { fetchArticles } = useContext(ArticlesContext);
  const { setPopup } = useContext(PopupContext);
  const categories = categoryData.data?.data || [];

  const [name, setTitle] = useState(title);
  const [content, setContent] = useState(body);
  const [categoryId, setCategoryId] = useState(category_id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "create") {
      articlesApi
        .createArticle({
          title: name,
          body: content,
          category_id: Number(categoryId),
          api_token: token,
        })
        .then((_res: { data: Article }) => {
          fetchArticles();
          setIsOpen(false);
          setPopup("Article created!");
        })
        .catch((err: ErrorInterface) => {
          setPopup("Error!");
          console.log(err);
        });
    }

    if (type === "edit") {
      articlesApi
        .editArticle({
          title: name,
          body: content,
          category_id: Number(categoryId),
          article_id: Number(id),
          api_token: token,
        })
        .then((_res: { data: Article }) => {
          fetchArticles();
          setIsOpen(false);
          setPopup("Article edited!");
        })
        .catch((err: ErrorInterface) => {
          setPopup("Error!");
          console.log(err);
        });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </fieldset>
      <fieldset>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
      </fieldset>
      <fieldset>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e: React.ChangeEvent<{ value: string }>) =>
            setCategoryId(Number(e.target.value))
          }
        >
          {categories.map((category, i) => {
            return (
              <option value={category.id} key={i}>
                {category.name}
              </option>
            );
          })}
        </select>
      </fieldset>
      <BaseButton>{type.toUpperCase()}</BaseButton>
    </form>
  );
};

export default ArticleForm;
