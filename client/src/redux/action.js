import axios from "axios";

export const GET_CATEGORIES = "GET_CATEGORIES";

export const getCategoriesAction = () => {
  const endPoint = "/categories/";

  return async (dispatch) => {
    try {
      const { data } = await axios(endPoint);

      return dispatch({
        type: GET_CATEGORIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.data);
    }
  };
};
