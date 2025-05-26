import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// 토큰 재발급 함수 (refresh token은 쿠키에 저장돼 있다고 가정)
async function refreshAccessToken() {
  try {
    await api.post('/api/user/reissue');
    return true;
  } catch (error) {
    console.error('❌ 토큰 재발급 실패:', error);
    return false;
  }
}

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

// 현재 로그인된 유저 정보 가져오기
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('❌ getCurrentUser error:', error);
    throw error;
  }
};

// 로그인 요청
export const login = async (credentials) => {
  try {
    const response = await api.post('/api/user/login', credentials);
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
export const signup = async (signupData) => {
  try {
    const response = await api.post('/api/user/join', signupData);
    return response.data;
  } catch (error) {
    console.error('❌ signup error:', error);
    throw error;
  }
};

export default api;  // 필요하면 다른 API도 여기서 import해서 사용 가능
