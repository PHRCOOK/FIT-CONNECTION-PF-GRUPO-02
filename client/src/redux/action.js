import { GET_ALL_CATEGORIES, POST_PRODUCT } from "./actionsTypes";

import axios from "axios";

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      console.log(response.data);
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
        "http://localhost:3001/products",
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
