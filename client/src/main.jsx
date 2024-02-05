import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const domain = "pabloelleproso.us.auth0.com";
const clientId = "J1C5DLRnm4PlJNL4AbcvuVqIus0g60rq";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://pabloelleproso.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata",
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
