import { fastapiApi } from "./client";
import { setAccessToken, setRefreshToken } from '../utils/token';

export const join = async (signupData) => {
  try {
    console.log("회원가입 요청 중")
    const response = await fastapiApi.post('api/user/join', signupData);
    return response.data;
  } catch (error) {
    console.error('❌ error:', error);
    throw error;
  }
};  

// 회원 정보 fetch 요청
export async function fetchUserInfo() {
 try {
    console.log("fetchUserInfo 요청중")
    const response = await fastapiApi.get('api/me');    
    const userData = response.data;
    sessionStorage.setItem('user', JSON.stringify(userData));
    console.log("✅ fetchUserInfo 성공:", userData);
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
    const response = await fastapiApi.post('/api/auth/login', credentials);
    const { access_token, refresh_token } = response.data;

    console.log(response.data)
    if (access_token) setAccessToken(access_token);
    if (refresh_token) setRefreshToken(refresh_token);
    return response.data;
  } catch (error) {
    console.error('❌ login error:', error);
    throw error;
  }
};

// 로그아웃 요청
