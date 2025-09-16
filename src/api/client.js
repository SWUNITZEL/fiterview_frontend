// src/api/client.js
import axios from 'axios';
import { getAccessToken } from '../utils/token';
import { refreshAccessToken } from './refreshToken';

export const fastapiApi = axios.create({
  baseURL: process.env.REACT_APP_FASTAPI_API_URL, // env는 process.env로 가져와야 함
});
export const springApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_API_URL,
  // withCredentials: true,
});
export const authApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_API_URL,
  withCredentials: true,
});

/**
 * @description 요청 인터셉터: accessToken 자동 추가
 * */
fastapiApi.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
springApi.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken(); 
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * @description 응답 인터셉터: 토큰 만료 시 재발급 시도
 * */
springApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('토큰 만료 → 재발급 시도');
      originalRequest._retry = true;

      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return springApi(originalRequest); // 재시도
      }
    }
    return Promise.reject(error);
  }
);
