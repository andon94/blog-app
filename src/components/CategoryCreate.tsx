import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import BaseModal from "../hoc/BaseModal";
import styles from "../pages/AdminDashboard.module.scss";
import CategoryForm from "./CategoryForm";

const CategoryCreate = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.create}>
        <h2>Categories</h2>
        <button onClick={() => setIsOpen(true)}>
          <AiOutlinePlus />
        </button>
      </div>
      {isOpen ? (
        <BaseModal setIsOpen={setIsOpen}>
          <CategoryForm type="create" setIsOpen={setIsOpen} />
        </BaseModal>
      ) : (
        <></>
      )}
    </>
  );
};

export default CategoryCreate;
