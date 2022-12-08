import { useContext } from "react";
import ArticleCreate from "../components/ArticleCreate";
import ArticleList from "../components/ArticleList";
import CategoryCreate from "../components/CategoryCreate";
import CategoryList from "../components/CategoryList";
import { ArticlesContext } from "../context/ArticlesContextProvider";
import { CategoryContext } from "../context/CategoryContextProvider";
import { BaseResponse } from "../hoc/BaseResponse";
import styles from "./AdminDashboard.module.scss";

const AdminDashboard = () => {
  const { articlesData } = useContext(ArticlesContext);
  const { categoryData } = useContext(CategoryContext);

  const Articles = BaseResponse(ArticleList, { ...articlesData });
  const Categories = BaseResponse(CategoryList, { ...categoryData });

  return (
    <div className={styles.dashboard}>
      <div className={styles.articles}>
        <ArticleCreate />
        <Articles />
      </div>
      <div className={styles.categories}>
        <CategoryCreate />
        <Categories />
      </div>
    </div>
  );
};

export default AdminDashboard;
