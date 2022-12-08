import { createContext, useEffect, useState } from "react";
import { Children } from "../interfaces/context";
import { baseFetcher } from "../services/api";
import Storage from "../services/storage";

export const AuthContext = createContext<{
  token: string;
  setToken: (value: string) => void;
}>({
  token: "",
  setToken: (_value) => null,
});

const AuthContextProvider = ({ children }: Children) => {
  const [token, setToken] = useState(Storage.getItem("storage"));

  useEffect(() => {
    setToken(token);
    if (token) {
      Storage.setItem("storage", `${token}`);
      baseFetcher.setOptions({ Authorization: `Bearer ${token}` });
    } else {
      Storage.removeItem("storage");
      baseFetcher.setOptions({ Authorization: null });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
