import axios from 'axios';
import { Platform } from 'react-native';

import { getToken } from './auth-storage';

// En el emulador de Android, localhost se mapea a 10.0.2.2. En el simulador de iOS, es localhost.
const API_HOST = Platform.OS === 'android' ? 'localhost' : 'localhost';
const API_PORT = 8000;

// Usamos /api como base para que coincida con los ejemplos de cURL proporcionados.
const BASE_URL = `http://${API_HOST}:${API_PORT}/api`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Añadimos un interceptor para incluir el token de autenticación en cada solicitud.
api.interceptors.request.use(
  async (config) => {
    console.log("ENTRE")
    const token = await getToken();
    console.log("token ", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config)
    return config;
  },
  (error) => {
    console.log("error", error)
    return Promise.reject(error);
  }
);

/**
 * Función fetcher para usar con SWR.
 * @param url - La ruta del endpoint a la que se hará la solicitud (ej: '/profile/me').
 * @returns Los datos de la respuesta.
 */
export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default api;