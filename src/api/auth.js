import { fastapiApi } from "./client";
import { setAccessToken, setRefreshToken } from '../utils/token';

export const join = async (signupData) => {
  try {
    console.log("join 요청중")
    const response = await fastapiApi.post('api/auth/join', signupData);
    console.log("join 성공")

    return response.data;
  } catch (error) {
    console.error('join 실패:', error);

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
    console.log("fetchUserInfo 성공:", userData);

    return userData;
  } catch (error) {
    console.warn('fetchUserInfo 실패:', error.response || error);
    sessionStorage.removeItem('user');

    return null;
  }
}

// 로그인 요청
export const login = async (credentials) => {
  try {
    console.log("login 요청중")
    const response = await fastapiApi.post('/api/auth/login', credentials);
    const { access_token, refresh_token } = response.data;    
    if (access_token) setAccessToken(access_token);
    if (refresh_token) setRefreshToken(refresh_token);

    console.log('login 성공');
    return response.data;
  } catch (error) {
    console.error('login 실패:', error);
    
    throw error;
  }
};

// 아이디 중복 검사
export async function checkId(id) {
 try {
    console.log("checkId 요청중")
    const response = await fastapiApi.get(`api/user/${id}/exists`);    
    const data = response.data;
    console.log("checkId 성공:", data);

    return true;
  } catch (error) {
    console.warn('checkId 실패:', error.response || error);

    return false;
  }
}