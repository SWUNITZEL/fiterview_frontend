import { springApi } from "./client";
import { saveAccessToken, saveRefreshToken, getAccessToken } from '../utils/token';

// 회원 정보 fetch 요청
export async function fetchUserInfo() {
 try {
    console.log("fetchUserInfo 요청중")
    console.log("AccessToken:", getAccessToken())
    const response = await springApi.get('api/user/navigation_data');    
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
    await springApi.post('api/user/logout');
  } catch (error) {
    console.error('❌ logout error:', error);
    throw error;
  }
};

// 회원가입 요청
export const join = async (signupData) => {
  try {
    console.log("회원가입 요청 중")
    const response = await springApi.post('api/user/join', signupData);
    return response.data;
  } catch (error) {
    console.error('❌ error:', error);
    throw error;
  }
};  
