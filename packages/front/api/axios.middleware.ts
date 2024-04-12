import axiosLib from "axios";
import { version } from "../package.json";
import { queries } from "./queries";

import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface ExtendedAxiosInstance extends AxiosInstance {
  graphql?: (query: string, variables?: Record<string, any>) => Promise<any>;
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

api.graphql = async (
  query: string,
  variables: Record<string, any> = {}
): Promise<object | Array<object>> => {
  try {
    console.log("Query: ", query);
    console.log("Full query: ", queries[query]);

    const response = await api.post("/", {
      query: queries[query],
      variables,
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    console.log("Response: ", response.data.data);

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
