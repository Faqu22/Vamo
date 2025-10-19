import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { getToken } from './auth-storage';

const API_HOST = '172.20.10.2';
const API_PORT = 8000;

const API_BASE_URL = `http://${API_HOST}:${API_PORT}/api`;

const axiosServices = axios.create({ baseURL: API_BASE_URL });

axiosServices.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    const errorMessage =
      axiosError.response?.data?.detail ||
      axiosError.response?.data?.message ||
      'Ocurrió un error inesperado. Por favor, intenta de nuevo.';
    console.error(
      `[Axios Error]: ${errorMessage} (Status: ${axiosError.response?.status})`,
      axiosError.toJSON()
    );
    throw new Error(errorMessage);
  } else {
    console.error('[Unexpected Error]:', error);
    throw new Error('Ocurrió un error inesperado.');
  }
};

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosServices.get(url, { ...config });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetcherPost = async (url: string, data: any = {}, config: AxiosRequestConfig = {}) => {
  try {
    const res = await axiosServices.post(url, data, config);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetcherPut = async (url: string, data: any = {}, config: AxiosRequestConfig = {}) => {
  try {
    const res = await axiosServices.put(url, data, config);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetcherPatch = async (
  url: string,
  data: any = {},
  config: AxiosRequestConfig = {}
) => {
  try {
    const res = await axiosServices.patch(url, data, config);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetcherDelete = async (url: string, config: AxiosRequestConfig = {}) => {
  try {
    const res = await axiosServices.delete(url, config);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export function createParam(param: string, value: string, first: boolean = false) {
  return first ? `?${param}=${value}` : `&${param}=${value}`;
}

export default axiosServices;