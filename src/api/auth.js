import axios from 'axios';
import { saveAccessToken, saveRefreshToken, getAccessToken, getRefreshToken } from '../utils/token';

export const api = axios.create({
  baseURL: process.env.REACT_APP_SRIPING_API_URL,
  withCredentials: true,
});

// 재발급 전용 API (인터셉터 X)
const authApi = axios.create({
  baseURL: process.env.REACT_APP_SRIPING_API_URL,
  withCredentials: true,
});

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

// 요청 인터셉터: accessToken 자동 추가
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();  // sessionStorage나 localStorage에서 꺼내는 함수
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 등록 (토큰 만료 시 재발급 시도)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// 로그인 요청
export const login = async (credentials) => {
  try {
    const response = await api.post(
      '/api/user/login',
      credentials
      );
    const { accessToken, refreshToken } = response.data;
    // console.log(response.data)
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
    await api.post('/api/user/logout');
  } catch (error) {
    console.error('❌ logout error:', error);
    throw error;
  }
};

// 회원가입 요청
export const join = async (signupData) => {
  try {
    console.log("회원가입 요청 중")
    const response = await api.post('/api/user/join', signupData);
    return response.data;
  } catch (error) {
    console.error('❌ error:', error);
    throw error;
  }
};  // 필요하면 다른 API도 여기서 import해서 사용 가능

export async function fetchUserInfo() {
  const response = await api.get('/user/me');  
  return response.data;
}