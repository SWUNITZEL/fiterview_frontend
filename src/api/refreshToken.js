// src/api/refreshToken.js
import { authApi } from './client';  // authApi만 import
import { saveAccessToken, saveRefreshToken, getRefreshToken } from '../utils/token';

export async function refreshAccessToken() {
  try {
    const oriRefreshToken = getRefreshToken();
    const response = await authApi.post('api/user/reissue', null, {
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
