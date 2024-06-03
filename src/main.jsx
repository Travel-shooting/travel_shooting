import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { ModalProvider } from "./contexts/modal.context";
import { ToastProvider } from "./contexts/toast.context";
import "./index.css";
import store from "./redux/store";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
