import { GET_ALL_CATEGORIES, POST_PRODUCT } from "./actionsTypes";

const initialState = {
  allCategories: [],
  allProducts: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
    case POST_PRODUCT:
      return {
        ...state,
        allProducts: [action.payload, ...state.allProducts],
      };
    default:
      return { ...state };
  }
};
