// src/api/client.js
import axios from "axios";
import { getAccessToken, setAccessToken } from "../utils/token";
import { refreshAccessToken } from "./refreshToken";

export const fastapiApi = axios.create({
  baseURL: process.env.REACT_APP_FASTAPI_API_URL,
});

/**
 * @description Refresh 중복 실행 방지용
 * */
let isRefreshing = false;
let refreshSubscribers = [];

// 새 토큰을 기다리는 요청들을 처리
function onRrefreshed(newToken) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
}

// 토큰이 재발급 될 때까지 대기하는 요청을 큐에 쌓음
function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

/**
 * @description 요청 인터셉터: accessToken 자동 추가
 * */
fastapiApi.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * @description 401 발생시 자동 refresh
 * */
fastapiApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // AccessToken 만료
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 이미 refresh 진행 중 → 해당 요청은 refresh 완료를 기다렸다가 다시 실행됨
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(fastapiApi(originalRequest));
          });
        });
      }

      // refresh 최초 실행
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();

        if (!newToken) {
          isRefreshing = false;
          return Promise.reject(error);
        }

        // 로컬 스토리지에 저장
        setAccessToken(newToken);

        // 기다리는 요청들 모두 처리
        onRrefreshed(newToken);
        isRefreshing = false;

        // 실패한 originalRequest 다시 실행
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return fastapiApi(originalRequest);
      } catch (err) {
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

