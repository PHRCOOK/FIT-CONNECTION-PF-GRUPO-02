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
  FETCH_USER_INFO,
  GET_ALL_USER,
  EMPTY_ALL_USER,
  FETCH_CURRENT_USER,
  SET_IS_ADMIN,
  GET_ALL_MEMBERSHIPS,
  POST_MEMBERSHIP,
  DELETE_MEMBERSHIP,
  PUT_MEMBERSHIP,
  SET_USER_SHOPPING,
} from "./actionsTypes";

import axios from "axios";

export const setIsAdmin = (is_Admin) => ({
  type: SET_IS_ADMIN,
  payload: is_Admin,
});

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/categories");

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
  console.log(product);
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/products", product);
      return dispatch({
        type: POST_PRODUCT,
        payload: data.product,
      });
    } catch (error) {
      const message = error.response.data.error;
      console.log(error);
      throw new Error(message);
    }
  };
};

export const applySettings = (settings) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products", {
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
      const { data } = await axios.get("/api/products", {
        params: { sortOrder: "ASC", page: 1, size: 10 },
      });
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

export const deleteProduct = (id, settings) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/update/${id}`, settings);
      console.log(data);
      console.log(data.products);

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
      const { data } = await axios.get("/api/products");
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
  console.log(id);
  console.log(product);
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/update/${id}`, product);
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

export const deleteCategory = (id, settings) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/categories/${id}`, settings);
      const newCategories = data.response.categories;
      return dispatch({
        type: DELETE_CATEGORY,
        payload: newCategories,
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
      const { data } = await axios.post("/api/categories", categoryForm);

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
      const { data } = await axios.put(`/api/categories/${id}`, category);
      return dispatch({
        type: PUT_CATEGORY,
        payload: data.response.categories,
      });
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      throw new Error(message);
    }
  };
};

export const getAllInstructors = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/instructors");
      // console.log(data);
      const items = data.Items;
      dispatch({
        type: GET_ALL_INSTRUCTORS,
        payload: items,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const deleteInstructor = (id, settings) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/instructors/${id}`, settings);
      console.log(data.instructors);
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
      const { data } = await axios.post("/api/instructors", instructorForm);

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
      const { data } = await axios.put(`/api/instructors/${id}`, instructor);
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
      const { data } = await axios.post("/api/users", form);
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

export const fetchUserInfo = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/api/clientInfo/${id}`);
      const { clientInfo } = data;
      const { user } = data;

      return dispatch({
        type: FETCH_USER_INFO,
        payload: { ...clientInfo, user, exists: true },
      });
    } catch (error) {
      // console.log(error);
      // const message = error.message;
      return dispatch({
        type: FETCH_USER_INFO,
        payload: {
          exists: false,
          address: null,
          phone: null,
          dni: null,
          birth_date: null,
        },
      });
    }
  };
};

export const postUserInfo = (info) => {
  const { id } = info;
  return async (dispatch) => {
    try {
      const parsedInfo = {
        address: info.address,
        phone: Number(info.phone),
        dni: Number(info.dni),
        birth_date: info.birth_date,
      };
      const { data } = await axios.post(`/api/clientInfo/${id}`, parsedInfo);
      const { clientInfo } = data;
      const { user } = data;

      return dispatch({
        type: FETCH_USER_INFO,
        payload: { ...clientInfo, user, exists: true },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const putUserInfo = (info) => {
  const { id } = info;
  return async (dispatch) => {
    try {
      const parsedInfo = {
        address: info.address,
        phone: Number(info.phone),
        dni: Number(info.dni),
        birth_date: info.birth_date,
      };
      const { data } = await axios.put(`/api/clientInfo/${id}`, parsedInfo);
      const { clientInfo } = data;
      const { user } = data;

      return dispatch({
        type: FETCH_USER_INFO,
        payload: { ...clientInfo, user, exists: true },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAllUsers = (status) => {
  const path = status ? "/api/users" : "/api/users/inactive";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(path);
      const items = data.Items;

      return dispatch({
        type: GET_ALL_USER,
        payload: items,
      });
    } catch (error) {
      return dispatch({
        type: EMPTY_ALL_USER,
      });
    }
  };
};

export const putUser = (status, id, info) => {
  const path = status ? "/api/users" : "/api/users/inactive";

  return async (dispatch) => {
    try {
      await axios.put(`/api/users/${id}`, info);

      const { data } = await axios.get(path);
      const items = data.Items;

      return dispatch({
        type: GET_ALL_USER,
        payload: items,
      });
    } catch (error) {
      return dispatch({
        type: EMPTY_ALL_USER,
      });
    }
  };
};

export const fetchUser = (user) => {
  return {
    type: FETCH_CURRENT_USER,
    payload: user,
  };
};

export const getAllMemberships = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/memberships");
      dispatch({
        type: GET_ALL_MEMBERSHIPS,
        payload: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const postMembership = (membership) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/memberships", membership);
      return dispatch({
        type: POST_MEMBERSHIP,
        payload: data,
      });
    } catch (error) {
      const message = error.response.data.error;
      throw new Error(message);
    }
  };
};

export const deleteMembership = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/memberships/delete/${id}`);
      return dispatch({
        type: DELETE_MEMBERSHIP,
        payload: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const putMembership = (id, membership) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/memberships/update/${id}`, membership);
      const { data } = await axios.get("/api/memberships");
      dispatch({
        type: PUT_MEMBERSHIP,
        payload: data,
      });
    } catch (error) {
      const message = error.response.data.error;
      throw new Error(message);
    }
  };
};
// export const putMembership = (id, membership) => {
//   return (dispatch) => {
//     return new Promise((resolve, reject) => {
//       axios.put(`/api/memberships/update/${id}`, membership)
//         .then(response => {
//           dispatch({
//             type: PUT_MEMBERSHIP,
//             payload: response.data,
//           });
//           resolve(response.data);
//         })
//         .catch(error => {
//           const message = error.response.data.error;
//           reject(new Error(message));
//         });
//     });
//   };
// };

export const setUserShopping = (user) => {
  return {
    type: SET_USER_SHOPPING,
    payload: user,
  };
};
