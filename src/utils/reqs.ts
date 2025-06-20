import axios from "axios";
import { backendServer } from "../config";
import { setPageAlert } from "../state/pageAlertSlice";
import { setPageLoading } from "../state/pageLoadingSlice";
import { getJwtToken } from "./auth";
import { sleep } from "./utils";

export const postReq2 = async (
  payload: {
    path: string;
    data?: any;
    headers?: any;
  },
  dispatch: any,
): Promise<any> => {
  dispatch(setPageLoading(true));
  await sleep();

  const { path, data, headers } = payload;
  return await axios({
    method: "POST",
    headers: { authorization: getJwtToken(), ...headers },
    url: `${backendServer}${path}`,
    data,
  })
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setPageAlert({
          severity: "warning",
          text: err?.response?.data?.message ?? err.message,
        })
      );
    })
    .finally(async () => {
      await sleep();
      dispatch(setPageLoading(false));
    });
};

export const getReq2 = async (
  payload: {
    url: string;
    params?: any;
    headers?: any;
  },
  dispatch: any
): Promise<any> => {
  dispatch(setPageLoading(true));

  const { url, params, headers } = payload;
  return await axios({
    method: "GET",
    headers: { authorization: getJwtToken(), ...headers },
    url,
    params,
  })
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setPageAlert({
          severity: "warning",
          text: err?.response?.data?.message ?? err.message,
        })
      );
    })
    .finally(() => {
      dispatch(setPageLoading(false));
    });
};
