import { useContext } from "react";
import { PopupContext } from "../context/PopupContextProvider";
import styles from "./BasePopup.module.scss";

const BasePopup = () => {
  const popupData = useContext(PopupContext);
  if (!popupData.popup) return <></>;

  return <div className={styles.popup}>{popupData.popup}</div>;
};

export default BasePopup;
