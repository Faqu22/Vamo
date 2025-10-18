import axios, { AxiosRequestConfig } from 'axios';

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

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  return await axiosServices.get(url, { ...config }).then((response) => response.data);
};

export const fetcherPost = async (url: string, data: any = {}, config: AxiosRequestConfig = {}) => {
  try {
    console.log("aaa", url, data, config)
    const res = await axiosServices.post(url, data, config);
    return res.data;
  } catch (error) {
    console.error('Error en fetcherPost:', error);
    throw error;
  }
};

export const fetcherPut = async (url: string, data: any = {}, config: AxiosRequestConfig = {}) => {
  try {
    const res = await axiosServices.put(url, data, config);
    return res.data;
  } catch (error) {
    console.error('Error en fetcherPut:', error);
    throw error;
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
    console.error('Error en fetcherPatch:', error);
    throw error;
  }
};

export const fetcherDelete = async (url: string, config: AxiosRequestConfig = {}) => {
  try {
    const res = await axiosServices.delete(url, config);
    return res.data;
  } catch (error) {
    console.error('Error en fetcherDelete:', error);
    throw error;
  }
};

export function createParam(param: string, value: string, first: boolean = false) {
  return first ? `?${param}=${value}` : `&${param}=${value}`;
}

export default axiosServices;