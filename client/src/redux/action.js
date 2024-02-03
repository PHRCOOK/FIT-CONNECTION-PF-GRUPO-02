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
  GET_ALL_INSTRUCTORS,
  DELETE_INSTRUCTOR,
  POST_INSTRCUTOR,
  PUT_INSTRUCTOR,
  POST_USER,
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
      throw new Error(error);
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
        payload: data.product,
      });
    } catch (error) {
      const message = error.response.data.error;
      throw new Error(message);
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
      throw new Error(error);
    }
  };
};

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/products");
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data.products,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const putProduct = (id, product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/products/update/${id}`,
        product
      );
      return dispatch({
        type: PUT_PRODUCT,
        payload: data.products,
      });
    } catch (error) {
      const message = error.response.data.error;
      throw new Error(message);
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
      const message = error.response.data.error;
      throw new Error(message);
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
      const message = error.response.data.message;
      throw new Error(message);
    }
  };
};

export const putCategory = (id, category) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/categories/${id}`,
        category
      );
      return dispatch({
        type: PUT_CATEGORY,
        payload: data.response.categories,
      });
    } catch (error) {
      const message = error.response.data.message;
      throw new Error(message);
    }
  };
};

export const getAllInstructors = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/instructors");

      dispatch({
        type: GET_ALL_INSTRUCTORS,
        payload: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const deleteInstructor = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/instructors/delete/${id}`
      );
      dispatch({
        type: DELETE_INSTRUCTOR,
        payload: data.instructors,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const postInstructor = (instructorForm) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/instructors",
        instructorForm
      );

      return dispatch({
        type: POST_INSTRCUTOR,
        payload: data.instructor,
      });
    } catch (error) {
      const message = error.response.data.error;
      throw new Error(message);
    }
  };
};

export const putInstructor = (id, instructor) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/instructors/${id}`,
        instructor
      );
      return dispatch({
        type: PUT_INSTRUCTOR,
        payload: data.instructors,
      });
    } catch (error) {
      const message = error.response.data.error;
      throw new Error(message);
    }
  };
};

export const postUser = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/users",
        form
      );
      return dispatch({
        type: POST_USER,
        payload: data.allUsers,
      });
    } catch (error) {
      const message = error.response.data.error;
      throw new Error(message);
    }
  };
};
