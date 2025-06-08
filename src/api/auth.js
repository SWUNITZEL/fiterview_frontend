import axios from 'axios';
import { saveAccessToken, saveRefreshToken, getAccessToken, getRefreshToken } from '../utils/token';

/**
 * @description 
 * - 401 에러 발생시 refreshAccessToken가 무한 요청되어 api를 두개로 나눔
 * - authApi는 재발급 전용 API (인터셉터 X)
 * */
const springApi = axios.create({
  baseURL: process.env.REACT_APP_SRIPING_API_URL,
  withCredentials: true,
});

const authApi = axios.create({
  baseURL: process.env.REACT_APP_SRIPING_API_URL,
  withCredentials: true,
});

/**
 * @description accessToken 만료 시 재발급
 * */
export async function refreshAccessToken() {
  try {
    const oriRefreshToken = getRefreshToken();
    const response = await authApi.post('/api/user/reissue', null, {
      headers: {
        Authorization: `Bearer ${oriRefreshToken}`,
      },
    });
    const { accessToken, refreshToken } = response.data;
    console.log('🔑 reissue 응답:', response.data);
    if (accessToken) saveAccessToken(accessToken);
    if (refreshToken) saveRefreshToken(refreshToken);

    return true;
  } catch (error) {
    console.error('❌ 토큰 재발급 실패:', error.response || error);
    return false;
  }
}

/**
 * @description 요청 인터셉터: accessToken 자동 추가
 * */
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
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      console.log("토큰 만료 재발급 시도")
      originalRequest._retry = true;
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return springApi(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// 회원 정보 fetch 요청
export async function fetchUserInfo() {
 try {
    console.log("fetchUserInfo 요청중")
    console.log("AccessToken:", getAccessToken())
    const response = await springApi.get('/api/user/navigation_data');    
    const userData = response.data;
    console.log(response.data)
    
    sessionStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.warn('⚠️ fetchUserInfo 실패:', error.response || error);
    sessionStorage.removeItem('user');
    return null;
  }
}

// 로그인 요청
export const login = async (credentials) => {
  try {
    console.log("로그인 요청 중")
    const response = await springApi.post(
      '/api/user/login',
      credentials
      );
    
    const { accessToken, refreshToken } = response.data;
    console.log(response.data)
    if (accessToken) saveAccessToken(accessToken);
    if (refreshToken) saveRefreshToken(refreshToken);
    return response.data;
  } catch (error) {
    console.error('❌ login error:', error);
    throw error;
  }
};

// 로그아웃 요청
export const logout = async () => {
  try {
    await springApi.post('/api/user/logout');
  } catch (error) {
    console.error('❌ logout error:', error);
    throw error;
  }
};

// 회원가입 요청
export const join = async (signupData) => {
  try {
    console.log("회원가입 요청 중")
    const response = await springApi.post('/api/user/join', signupData);
    return response.data;
  } catch (error) {
    console.error('❌ error:', error);
    throw error;
  }
};  