import axios from "axios";
import { useContext, useMemo } from "react";
import AuthContext from "../contexts/Auth/AuthContext";

export const baseURL = "http://localhost:5000/";

const useAxios = () => {
  const { authState } = useContext(AuthContext);

  

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL,
        headers: { authorization:  authState },
      }),
    [authState]
  );

  // axiosInstance.interceptors.request.use(async (req) => {
  //   const user = jwt_decode(authTokens.access);
  //   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  //   if (!isExpired) return req;

  //   const response = await axios.post(`${baseURL}/api/token/refresh/`, {
  //     refresh: authTokens.refresh,
  //   });

  //   authDispatch(authActions.REFRESH_TOKEN, { payload: { authTokens } });

  //   req.headers.Authorization = `Bearer ${response.data.access}`;
  //   return req;
  // });

  return axiosInstance;
};

export default useAxios;
