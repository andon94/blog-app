import { Button } from "../interfaces/base";
import styles from "./BaseButton.module.scss";

const BaseButton = ({
  children,
  variant = "primary",
  type = "button",
  ...rest
}: Button) => {
  const buttonClasses = [styles.button, styles[variant]].join(" ");
  return (
    <button {...rest} className={buttonClasses}>
      {children}
    </button>
  );
};

export default BaseButton;
