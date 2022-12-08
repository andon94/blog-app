import styles from "./ArticleForm.module.scss";
import BaseButton from "./BaseButton";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { CategoryContext } from "../context/CategoryContextProvider";
import { articlesApi } from "../services/articles";
import { AuthContext } from "../context/AuthContextProvider";
import { ArticlesContext } from "../context/ArticlesContextProvider";
import { Article } from "../interfaces/articles";
import { ErrorInterface } from "../interfaces/base";
import { PopupContext } from "../context/PopupContextProvider";

const ArticleForm = ({
  title,
  body,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    title: string;
    content: string;
    categoryId: number;
  }>({
    defaultValues: {
      title,
      content: body,
      categoryId: category_id,
    },
  });

  const onSubmit = ({
    title,
    content,
    categoryId,
  }: {
    title: string;
    content: string;
    categoryId: number;
  }) => {
    if (type === "create") {
      articlesApi
        .createArticle({
          title,
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
          title,
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label htmlFor="title">Title</label>
        <input
          defaultValue={title}
          id="title"
          {...register("title", {
            required: "Title is required.",
            maxLength: 225,
          })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="content">Content</label>
        <textarea
          defaultValue={body}
          id="content"
          {...register("content", {
            required: "Content is required.",
            maxLength: 1000,
          })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          {...register("categoryId", { required: true })}
          defaultValue={category_id}
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
      <fieldset className={styles.errors}>
        <p>
          <ErrorMessage errors={errors} name="title" />
        </p>
        <p>
          <ErrorMessage errors={errors} name="content" />
        </p>
      </fieldset>
      <BaseButton>{type.toUpperCase()}</BaseButton>
    </form>
  );
};

export default ArticleForm;
