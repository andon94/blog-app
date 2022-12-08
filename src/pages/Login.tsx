import BaseButton from "../components/BaseButton";
import styles from "./Login.module.scss";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToken("9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN");
    navigate({ pathname: "/admin-dashboard" });
  };
  return (
    <form className={styles.login} onSubmit={(e) => handleLogin(e)}>
      <h2>Login</h2>
      <p>
        Please login to access the Admin Dashboard where you can view, add, edit
        and delete articles and categories. Do so only if you have admin
        privileges.
      </p>
      <BaseButton>Login</BaseButton>
    </form>
  );
};

export default Login;
