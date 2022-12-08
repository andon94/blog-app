import { createContext, useEffect, useState } from "react";
import { Children } from "../interfaces/context";

export const PopupContext = createContext<{
  popup: string;
  setPopup: (value: string) => void;
}>({
  popup: "",
  setPopup: (_value) => null,
});

const PopupContextProvider = ({ children }: Children) => {
  const [popup, setPopup] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setPopup("");
    }, 3000);
  }, [popup]);

  return (
    <PopupContext.Provider value={{ popup, setPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContextProvider;
