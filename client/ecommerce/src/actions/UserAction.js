import axios from "axios";

import {
  USER_REQUEST_LOGIN,
  USER_REQUEST_LOGIN_SUCCESFUL,
  USER_REQUEST_LOGIN_FAILED,
  USER_REQUEST_REGISTER,
  USER_REQUEST_REGISTER_SUCCESFUL,
  USER_REQUEST_REGISTER_FAILED,
} from "../contants/UserConstants";

export const vendorLogin = () => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST_LOGIN });
    const { data } = await axios.post("/users/login/");
    dispatch({ type: USER_REQUEST_LOGIN_SUCCESFUL });
  } catch (error) {
    dispatch({
      type: USER_REQUEST_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const vendorRegister = (first_name, last_name, email, password, password2) => async (dispatch) => {
  try {
      dispatch({ type: USER_REQUEST_REGISTER });

      const config = {
          headers: {
              "Content-Type": "application/json",
          },
      };

      const { data } = await axios.post(
          "/users/register/",
          { first_name, last_name, email, password, password2 },
          config
      );

      dispatch({ type: USER_REQUEST_REGISTER_SUCCESFUL, payload: data });

  } catch (error) {
      dispatch({
          type: USER_REQUEST_REGISTER_FAILED,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      });
  }
};
