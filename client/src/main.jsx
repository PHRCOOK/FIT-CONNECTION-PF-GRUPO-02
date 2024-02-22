import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";

import { HashRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const domain = "https://pabloelleproso.us.auth0.com";
const clientId = "htRNcTw4YHGioeiGudC6khHz7bU5rrry";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
