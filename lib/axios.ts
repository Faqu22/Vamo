import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { MOCK_CONVERSATIONS } from '@/mocksdata/conversations';
import { MOCK_USERS } from '@/mocksdata/users';
import { getToken } from './auth-storage';

const API_HOST = '35.238.192.247';
const API_BASE_URL = `http://${API_HOST}/api`;

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

    // --- MOCK DATA INTEGRATION ---
    if (url.startsWith('/profiles/')) {
      const userId = url.split('/')[2];
      const user = MOCK_USERS.find((u) => u.id === userId);
      console.log(`Using mock data for /profiles/${userId}`);
      if (user) {
        return user;
      }
      throw new Error('User not found');
    }
    if (url === '/messages/conversations') {
      console.log('Using mock data for /messages/conversations');
      return { conversations: MOCK_CONVERSATIONS };
    }
    // --- END MOCK DATA INTEGRATION ---

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
    console.log('ERROR', error);
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