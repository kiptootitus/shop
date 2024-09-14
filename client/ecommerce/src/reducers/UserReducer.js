import {
  USER_REQUEST_LOGIN,
  USER_REQUEST_LOGIN_SUCCESFUL,
  USER_REQUEST_LOGIN_FAILED,
  USER_REQUEST_REGISTER,
  USER_REQUEST_REGISTER_SUCCESFUL,
  USER_REQUEST_REGISTER_FAILED,
} from "../contants/UserConstants";

const initialState = {
  loading: false,
  error: null,

};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type){
    case USER_REQUEST_LOGIN:
      return { ...state, loading: true };
    case USER_REQUEST_LOGIN_SUCCESFUL:
      return {...state, loading: false, user: action.payload.results };
    case USER_REQUEST_LOGIN_FAILED:
      return {...state, loading: false, error: action.payload };
    default:
      return state
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
      case USER_REQUEST_REGISTER:
          return { loading: true };
      case USER_REQUEST_REGISTER_SUCCESFUL:
          return { loading: false, userInfo: action.payload };
      case USER_REQUEST_REGISTER_FAILED:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};