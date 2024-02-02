import { GET_ALL_CATEGORIES, POST_PRODUCT } from "./actionsTypes";

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
