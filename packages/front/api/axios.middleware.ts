import axiosLib, { type AxiosError } from "axios";
import { version } from "../package.json";
import { gqlQuery } from "./queries";

import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { GraphqlResult, GraphqlVariables } from "~/types/Query.dt";

interface ExtendedAxiosInstance extends AxiosInstance {
  graphql?: <T>(query: string, variables?: GraphqlVariables) => Promise<T>;
}

const { VITE_API_URL, VITE_API_PORT } = import.meta.env;

export const api: ExtendedAxiosInstance = axiosLib.create({
  baseURL: `${VITE_API_URL}:${VITE_API_PORT}`,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    "x-app-version": version,
  },
});

api.graphql = async <T>(
  query: string,
  variables: GraphqlVariables = {}
): Promise<T> => {
  const response: AxiosResponse<GraphqlResult<T>> = await api.post("/", {
    query: gqlQuery[query],
    variables,
  });

  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }

  if (response.data.data === undefined) {
    throw new Error("Aucune data");
  }
  return response.data.data;
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userDatas: { token: string } = JSON.parse(
    localStorage.getItem("userData") ?? "{}"
  );
  const userToken: string = userDatas.token;
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
});

api.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => {
    return response;
  },
  (originalError: AxiosError) => {
    const popupsStore = usePopUpsStore();
    popupsStore.setPopUp(originalError, "error");
  }
);
