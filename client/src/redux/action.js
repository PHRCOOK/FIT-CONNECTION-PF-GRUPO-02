<<<<<<< HEAD
import { GET_ALL_CATEGORIES, POST_PRODUCT } from "./actionsTypes";
=======
import {
  GET_ALL_CATEGORIES,
  POST_PRODUCT,
  APPLY_FILTER,
  RESET_FILTER,
  EMPTY_FILTER,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  PUT_PRODUCT,
  DELETE_CATEGORY,
  POST_CATEGORY,
  PUT_CATEGORY,
} from "./actionsTypes";
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637

import axios from "axios";

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
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
      const { data } = await axios.post(
        "http://localhost:3001/api/products",
        product
      );
      console.log(data);
      return dispatch({
        type: POST_PRODUCT,
        payload: data.product,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
<<<<<<< HEAD
=======

export const applySettings = (settings) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/products", {
        params: settings,
      });

      const items = data.Items;

      return dispatch({
        type: APPLY_FILTER,
        payload: { items, settings },
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

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/products/delete/${id}`
      );

      return dispatch({
        type: DELETE_PRODUCT,
        payload: data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/products");
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data.Items,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const putProduct = (id, product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/products/update/${id}`,
        product
      );
      return dispatch({
        type: PUT_PRODUCT,
        payload: data.products,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/categories/${id}`
      );
      return dispatch({
        type: DELETE_CATEGORY,
        payload: data.categories,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postCategory = (categoryForm) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/categories",
        categoryForm
      );

      return dispatch({
        type: POST_CATEGORY,
        payload: data.response,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
