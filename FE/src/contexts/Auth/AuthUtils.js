import jwt_decode from "jwt-decode";

export const authInitialState = {
  authState: localStorage.getItem("authState")
    ? JSON.parse(localStorage.getItem("authState"))
    : null,
  isLoading: true,
  error: null,
};

export const authActions = {
  SUCCESS_LOGIN: "SUCCESS_LOGIN",
  FAIL_LOGIN: "FAIL_LOGIN",
  LOGOUT: "LOGOUT",
};

export function authReducer(state, action) {
  switch (action.type) {
    case authActions.SUCCESS_LOGIN:
      const authState = action.payload.authState;
      console.log(action.payload, 123);
      console.log(authState);
      localStorage.setItem("authState", JSON.stringify(authState));
      return {
        ...state,
        authState,
        isLoading: false,
      };
    case authActions.FAIL_LOGIN:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case authActions.LOGOUT:
      localStorage.removeItem("authState");
      return {
        ...state,
        authState: null,
      };
    default:
      return state;
  }
}
