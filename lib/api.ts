import axios from 'axios';
import { Platform } from 'react-native';

// En el emulador de Android, localhost se mapea a 10.0.2.2. En el simulador de iOS, es localhost.
const API_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const API_PORT = 8000;

// La documentación de la API especifica un prefijo de ruta /v1.
const BASE_URL = `http://${API_HOST}:${API_PORT}/v1`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Añadir un interceptor para los tokens de autenticación una vez que se implemente el inicio de sesión.

/**
 * Función fetcher para usar con SWR.
 * @param url - La ruta del endpoint a la que se hará la solicitud (ej: '/profile/me').
 * @returns Los datos de la respuesta.
 */
export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default api;