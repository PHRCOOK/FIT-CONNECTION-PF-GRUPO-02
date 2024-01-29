import {
  GET_ALL_CATEGORIES,
  POST_PRODUCT,
  APPLY_FILTER,
  RESET_FILTER,
  EMPTY_FILTER,
} from "./actionsTypes";

const initialState = {
  allCategories: [],
  allProducts: [],
  productsToShow: [],
  filterSettings: {
    sortOrder: "ASC",
  },
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

    case APPLY_FILTER:
      return {
        ...state,
        filterSettings: action.payload.settings,
        productsToShow: action.payload.data,
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

    default:
      return { ...state };
  }
};
