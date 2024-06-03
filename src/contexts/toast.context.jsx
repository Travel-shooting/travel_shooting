import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

let initialState = {
  toastOn: () => {},
  toastOff: () => {},
};

export const ToastContext = createContext(initialState);

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const value = {
    toastOn: (toast) => {
      setToasts((prev) => [...prev, toast]);
    },
    toastOff: (id) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
  };
  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.length > 0 && (
        <ul>
          {toasts.map((toast) => (
            <li key={toast.id}>
              <Toast toast={toast} />
            </li>
          ))}
        </ul>
      )}
    </ToastContext.Provider>
  );
}
