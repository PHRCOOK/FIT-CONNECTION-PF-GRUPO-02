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

const initialState = {
  allMemberships: [],
  userShopping: null,
  allCategories: [],
  allProducts: [],
  allInstructors: [],
  allUsers: [],
  productsToShow: [],
  filterSettings: {
    sortOrder: "ASC",
    page: 1,
    size: 10,
  },
  totalPages: 0,
  userInfo: {
    address: null,
    phone: null,
    dni: null,
    birth_date: null,
  },
  currentUser: {},
  isAdmin: false,
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

    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: action.payload,
        productsToShow: action.payload,
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };

    case PUT_PRODUCT:
      return {
        ...state,
        allProducts: action.payload,
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

    case GET_ALL_INSTRUCTORS:
      return {
        ...state,
        allInstructors: action.payload,
      };

    case DELETE_INSTRUCTOR:
      return {
        ...state,
        allInstructors: action.payload,
      };

    case POST_INSTRCUTOR:
      return {
        ...state,
        allInstructors: [...state.allInstructors, action.payload],
      };

    case PUT_INSTRUCTOR:
      return {
        ...state,
        allInstructors: action.payload,
      };

    case POST_USER:
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
      };

    case GET_ALL_USER:
      return {
        ...state,
        allUsers: action.payload,
      };

    case EMPTY_ALL_USER:
      return {
        ...state,
        allUsers: [],
      };

    case FETCH_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };

    case FETCH_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };

    case GET_ALL_MEMBERSHIPS:
      return {
        ...state,
        allMemberships: action.payload,
      };

    case POST_MEMBERSHIP:
      return {
        ...state,
        allMemberships: [...state.allMemberships, action.payload],
      };

    case DELETE_MEMBERSHIP:
      return {
        ...state,
        allMemberships: action.payload,
      };

    case PUT_MEMBERSHIP:
      return {
        ...state,
        allMemberships: action.payload,
      };

    case SET_USER_SHOPPING:
      return { ...state, userShopping: action.payload };
    default:
      return { ...state };
  }
};
