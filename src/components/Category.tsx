import { useState } from "react";
import BaseModal from "../hoc/BaseModal";
import BaseModify from "./BaseModify";
import styles from "./Category.module.scss";
import CategoryForm from "./CategoryForm";

const Category = ({
  name,
  description,
  id,
}: {
  name: string;
  description: string;
  id: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const formData = { name, description, id };

  return (
    <li className={styles.category}>
      <p className={styles.name}>{name}</p>
      <p className={styles.description}>{description}</p>
      <BaseModify id={id} openForm={setIsOpen} type="category" />
      {isOpen ? (
        <BaseModal setIsOpen={setIsOpen}>
          <CategoryForm {...formData} type="edit" setIsOpen={setIsOpen} />
        </BaseModal>
      ) : (
        <></>
      )}
    </li>
  );
};

export default Category;
