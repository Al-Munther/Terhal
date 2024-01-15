import React, { createContext } from "react";
import { useReducer } from "react";
import { authActions, authInitialState, authReducer } from "./AuthUtils";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);
  const navigate = useNavigate();

  let loginUser = async ({ email, password }) => {
    let response = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let data = await response.json();

    if (response.ok) {
      console.log(data);
      dispatch({
        type: authActions.SUCCESS_LOGIN,
        payload: { authState: data },
      });
      navigate("/");
    } else {
      dispatch({ type: authActions.FAIL_LOGIN, payload: data });
    }
  };

  let logoutUser = () => {
    dispatch({ type: authActions.LOGOUT });
    navigate("/login");
  };

  let contextData = {
    authState: authState.authState,
    loginUser: loginUser,
    authDispatch: dispatch,
    logoutUser,
    authError: authState.error,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
