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
      const { data } = await axios.get("http://localhost:3001/api/categories");

      const items = data.Items;

      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: items,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/products",
        product
      );
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
      const { data } = await axios.get("http://localhost:3001/api/products", {
        params: settings,
      });

      const { products, totalPages } = data;

      return dispatch({
        type: APPLY_FILTER,
        payload: { products, settings, totalPages },
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
      const { data } = await axios.get("http://localhost:3001/api/products", {
        params: { sortOrder: "ASC", page: 1, size: 10 },
      });
      console.log(data);
      return dispatch({
        type: RESET_FILTER,
        payload: data,
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
