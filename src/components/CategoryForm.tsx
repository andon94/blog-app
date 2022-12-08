import styles from "./ArticleForm.module.scss";
import BaseButton from "./BaseButton";
import { useContext, useState } from "react";
import { categoriesApi } from "../services/categories";
import { AuthContext } from "../context/AuthContextProvider";
import { CategoryContext } from "../context/CategoryContextProvider";
import { Category } from "../interfaces/categories";
import { ErrorInterface } from "../interfaces/base";
import { PopupContext } from "../context/PopupContextProvider";

const CategoryForm = ({
  name = "",
  description = "",
  id = 0,
  type,
  setIsOpen,
}: {
  name?: string;
  description?: string;
  id?: number;
  type: "edit" | "create";
  setIsOpen: (close: boolean) => void;
}) => {
  const { token } = useContext(AuthContext);
  const { fetchCategories } = useContext(CategoryContext);
  const { setPopup } = useContext(PopupContext);
  const [title, setTitle] = useState(name);
  const [content, setContent] = useState(description);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    categoriesApi
      .createCategory({
        name: title,
        description: content,
        id: Number(id),
        api_token: token,
      })
      .then((res: Category) => {
        fetchCategories();
        setIsOpen(false);
        setPopup("Category created!");
      })
      .catch((err: ErrorInterface) => {
        setPopup("Error!");
        console.log(err);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </fieldset>
      <fieldset>
        <label htmlFor="content">Description</label>
        <input
          id="content"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setContent(e.target.value)
          }
        />
      </fieldset>
      <BaseButton>{type.toUpperCase()}</BaseButton>
    </form>
  );
};

export default CategoryForm;
