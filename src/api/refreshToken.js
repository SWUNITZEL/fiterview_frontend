// src/api/refreshToken.js
import { authApi } from "./client";
import { saveTokens, getRefreshToken } from "../utils/token";

export async function refreshAccessToken() {
  try {
    const oriRefreshToken = getRefreshToken();
    if (!oriRefreshToken) throw new Error("리프레시 토큰이 없습니다.");

    const response = await authApi.post("api/user/reissue", null, {
      headers: {
        Authorization: `Bearer ${oriRefreshToken}`,
      },
    });

    const { accessToken, refreshToken: newRefreshToken, email, role } = response.data;
    console.log("reissue 응답:", response.data);

    if (accessToken && newRefreshToken) {
      saveTokens({
        accessToken,
        refreshToken: newRefreshToken,
        email,
        role,
      });
      console.log("토큰 재발급 및 저장 완료");
    }

    return true;
  } catch (error) {
    console.error("토큰 재발급 실패:", error.response || error);
    return false;
  }
}
