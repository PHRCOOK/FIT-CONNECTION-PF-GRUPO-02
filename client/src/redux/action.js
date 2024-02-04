import {
  GET_ALL_CATEGORIES,
  POST_PRODUCT,
  APPLY_FILTER,
  RESET_FILTER,
  EMPTY_FILTER,
} from "./actionsTypes";

import axios from "axios";

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/categories");
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/products", product);
      return dispatch({
        type: POST_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const applySettings = (settings) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/products", {
        params: settings,
      });

      return dispatch({
        type: APPLY_FILTER,
        payload: { data, settings },
      });
    } catch (error) {
      console.log(error.message);
      return dispatch({
        type: EMPTY_FILTER,
        payload: settings,
      });
    }
  };
};

export const resetSettings = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/products", {
        params: { sortOrder: "ASC" },
      });
      return dispatch({
        type: RESET_FILTER,
        payload: { data },
      });
    } catch (error) {
      console.log(error.message);
      return dispatch({
        type: EMPTY_FILTER,
        payload: settings,
      });
    }
  };
};
