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
        allProducts: [...state.allProducts, action.payload],
      };
<<<<<<< HEAD
=======

    case APPLY_FILTER:
      return {
        ...state,
        filterSettings: action.payload.settings,
        productsToShow: action.payload.items,
      };

    case RESET_FILTER:
      return {
        ...state,
        productsToShow: action.payload.data,
        filterSettings: {
          sortOrder: "ASC",
          minPrice: "",
          maxPrice: "",
          category_id: null,
          name: "",
          code: "",
        },
      };

    case EMPTY_FILTER:
      return {
        ...state,
        productsToShow: [],
        filterSettings: action.payload,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: action.payload,
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };

    case PUT_PRODUCT:
      return {
        ...state,
      };

    case DELETE_CATEGORY:
      return {
        ...state,
      };

    case POST_CATEGORY:
      return {
        ...state,
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        allCategories: action.payload,
      };

    case POST_CATEGORY:
      return {
        ...state,
        allCategories: [...state.allCategories, action.payload],
      };

    case PUT_CATEGORY:
      return {
        ...state,
        allCategories: action.payload,
      };

>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
    default:
      return { ...state };
  }
};
