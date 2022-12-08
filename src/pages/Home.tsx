import { useContext } from "react";
import ArticleList from "../components/ArticleList";
import { ArticlesContext } from "../context/ArticlesContextProvider";
import { BaseResponse } from "../hoc/BaseResponse";

const Home = () => {
  const { articlesData } = useContext(ArticlesContext);
  const Articles = BaseResponse(ArticleList, { ...articlesData });

  return (
    <>
      <Articles />
    </>
  );
};

export default Home;
