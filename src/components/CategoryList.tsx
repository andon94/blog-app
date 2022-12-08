import { CategoryResponse } from "../interfaces/categories";
import Category from "./Category";
import styles from "./Category.module.scss";

const CategoryList = (categoryResponse: CategoryResponse) => {
  const categories = categoryResponse.data || [];
  return (
    <>
      <ul className={styles["category-list"]}>
        {categories.map((category, i) => {
          return <Category key={i} {...category} />;
        })}
      </ul>
    </>
  );
};

export default CategoryList;
