import React from "react";
// import "./components/css-modules/index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
import "bootstrap/dist/css/bootstrap.min.css";
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
