import { useState } from "react";
import { useCallback } from "react";
import useAxios from "./useAxios";
import axios from 'axios'
const useHttpRequest = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | succeeded | failed
  const [error, setError] = useState(null);
  const axios = useAxios();

  const sendRequest = useCallback(
    async (requestConfig, handleData) => {
      setStatus("loading");
      setError(null);

      try {
        const response = await axios({
          ...requestConfig,
          url: requestConfig.url,
          method: requestConfig.method || "GET",
          data: requestConfig.data,
        });

        if (!response.statusText === "OK") {
          throw Error(response.text);
        }

        const data = await response.data;

        handleData(data);
        setStatus("succeeded");
      } catch (err) {
        setStatus("failed");
        setError(err);
      }
    },
    [axios]
  );

  return { status, error, sendRequest };
};

export default useHttpRequest;
