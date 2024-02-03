import {
  GET_ALL_CATEGORIES,
  POST_PRODUCT,
  APPLY_FILTER,
  RESET_FILTER,
  EMPTY_FILTER,
} from "./actionsTypes";

const initialState = {
  allCategories: [],
  productsToShow: [],
  filterSettings: {
    sortOrder: "ASC",
    page: 1,
    size: 10,
  },
  totalPages: 0,
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
        productsToShow: action.payload.products,
        totalPages: action.payload.totalPages,
      };

    case RESET_FILTER:
      console.log(action.payload);
      return {
        ...state,
        productsToShow: action.payload.products,
        filterSettings: {
          sortOrder: "ASC",
          minPrice: "",
          maxPrice: "",
          category_id: null,
          name: "",
          code: "",
          page: 1,
          size: 10,
        },
        totalPages: action.payload.totalPages,
        currentPage: 1,
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
