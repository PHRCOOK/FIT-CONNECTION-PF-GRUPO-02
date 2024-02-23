import { createStore, applyMiddleware, compose } from "redux";

import { reducer } from "./reducer";

import { thunk } from "redux-thunk";

import isAdminMiddleware from "./isAdminMiddleware";

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhacer(applyMiddleware(thunk, isAdminMiddleware))
);

export default store;
