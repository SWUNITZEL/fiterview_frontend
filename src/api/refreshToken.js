// src/api/refreshToken.js
import { fastapiApi } from './client';  // authApi만 import
import { setAccessToken, setRefreshToken, getRefreshToken } from '../utils/token';

export async function refreshAccessToken() {
  try {
    const oriRefreshToken = getRefreshToken();
    const response = await fastapiApi.post('api/auth/reissue', null, {
      headers: {
        Authorization: `Bearer ${oriRefreshToken}`,
      },
    });

    const { accessToken: access_token, refreshToken: refresh_token } = response.data;
    console.log('🔑 reissue 응답:', response.data);

    if (access_token) setAccessToken(access_token);
    if (refresh_token) setRefreshToken(refresh_token);

    return true;
  } catch (error) {
    console.error('❌ 토큰 재발급 실패:', error.response || error);
    return false;
  }
}
