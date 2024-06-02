import { createContext, useContext, useState } from "react";
import Login from "../components/UserComponent/Login";

const initialValue = {
  open: () => {},
  close: () => {},
};

const ModalContext = createContext(initialValue);

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [modalOptions, setModalOptions] = useState(null);

  const value = {
    open: (options) => {
      setModalOptions(options);
    },
    close: () => {
      setModalOptions(null);
    },
  };
  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalOptions && <Login />}
    </ModalContext.Provider>
  );
}
