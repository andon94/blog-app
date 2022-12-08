import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import BaseModal from "../hoc/BaseModal";
import styles from "../pages/AdminDashboard.module.scss";
import ArticleForm from "./ArticleForm";
const ArticleCreate = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.create}>
        <h2>Articles</h2>
        <button onClick={() => setIsOpen(true)}>
          <AiOutlinePlus />
        </button>
      </div>
      {isOpen ? (
        <BaseModal setIsOpen={setIsOpen}>
          <ArticleForm type="create" setIsOpen={setIsOpen} />
        </BaseModal>
      ) : (
        <></>
      )}
    </>
  );
};

export default ArticleCreate;
