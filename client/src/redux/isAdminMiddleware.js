import axios from 'axios';
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
} from "./actionsTypes";


const isAdminMiddleware = store => next => action => {
  const { isAdmin } = store.getState();
  // Lista de acciones que requieren verificación de isAdmin
  const actionsToCheck = [ /* otras acciones aquí */];//Añadir las actions a proteger y verificar que esten protegidas en el back!! 
  if (actionsToCheck.includes(action.type) && !isAdmin || actionsToCheck.includes(action.type)=== undefined) {
    throw new Error('El usuario no es administrador');
  }

  if (isAdmin) {
    axios.defaults.headers.common['is_admin'] = isAdmin;
  } else {

    delete axios.defaults.headers.common['is_admin'];
  }
  return next(action);
};

export default isAdminMiddleware;