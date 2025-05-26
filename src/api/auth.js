import axios from 'axios';

// 기본 axios 인스턴스 생성 (필요 시 baseURL, headers 세팅)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // 쿠키 인증 필요할 경우
});

// 현재 로그인된 유저 정보 가져오기
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data; // 유저 정보 반환
  } catch (error) {
    console.error('❌ getCurrentUser error:', error);
    throw error;
  }
};

// 로그인 요청
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('❌ login error:', error);
    throw error;
  }
};

// 로그아웃 요청
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('❌ logout error:', error);
    throw error;
  }
};
