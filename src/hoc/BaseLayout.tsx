import { Outlet } from "react-router-dom";
import BaseNavigation from "../components/BaseNavigation";
import styles from "./BaseLayout.module.scss";

const BaseLayout = () => {
  return (
    <>
      <main className={styles.layout}>
        <BaseNavigation />
        <Outlet />
      </main>
    </>
  );
};

export default BaseLayout;
