import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./BaseModal.module.scss";

const BaseModal = ({
  children,
  setIsOpen,
}: {
  children: JSX.Element | JSX.Element[];
  setIsOpen: (close: boolean) => void;
}) => {
  const modalRoot = document.querySelector("#modal-root");
  return modalRoot ? (
    createPortal(
      <>
        <div className={styles.modal}>
          <div className={styles.container}>
            <button className={styles.icon} onClick={() => setIsOpen(false)}>
              <AiOutlineClose />
            </button>
            {children}
          </div>
        </div>
      </>,
      modalRoot
    )
  ) : (
    <></>
  );
};

export default BaseModal;
