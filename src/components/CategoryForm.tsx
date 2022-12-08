import styles from "./ArticleForm.module.scss";
import BaseButton from "./BaseButton";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    description: string;
    id: number;
  }>({
    defaultValues: {
      name,
      description,
      id,
    },
  });

  const onSubmit = ({
    name,
    description,
    id,
  }: {
    name: string;
    description: string;
    id: number;
  }) => {
    categoriesApi
      .createCategory({
        name,
        description,
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label htmlFor="name">Title</label>
        <input
          id="name"
          defaultValue={name}
          {...register("name", {
            required: "Name is required",
            maxLength: 225,
          })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          defaultValue={description}
          {...register("description", {
            required: "Description is required",
            maxLength: 512,
          })}
        />
      </fieldset>
      <fieldset className={styles.errors}>
        <p>
          <ErrorMessage errors={errors} name="name" />
        </p>
        <p>
          <ErrorMessage errors={errors} name="description" />
        </p>
      </fieldset>
      <BaseButton>{type.toUpperCase()}</BaseButton>
    </form>
  );
};

export default CategoryForm;
