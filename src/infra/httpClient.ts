import { Client } from "@/domain/entities";
import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: "http://www.mocky.io/v2",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUrl = async (url: string) => {
  try {
    const response = await apiClient.get(url);
    const data = response.data;
    return data;
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError;
      return axiosError.response.data;
    }
    throw err;
  }
};
