import { springApi } from "./client";
import { saveTokens, getAccessToken } from "../utils/token";

// 회원 정보 fetch 요청
export async function fetchUserInfo() {
  try {
    console.log("fetchUserInfo 요청중");
    const response = await springApi.get("api/user/navigation_data");
    const userData = response.data;

    sessionStorage.setItem("user", JSON.stringify(userData));
    console.log("fetchUserInfo 성공:", userData);

    return userData;
  } catch (error) {
    console.warn("fetchUserInfo 실패:", error.response || error);
    sessionStorage.removeItem("user");
    return null;
  }
}

//로그인 요청
export const login = async (credentials) => {
  try {
    console.log("로그인 요청 중");
    const response = await springApi.post("/api/user/login", credentials);

    const { accessToken, refreshToken, email, role } = response.data;
    console.log("로그인 응답:", response.data);

    //통합 저장 함수 사용
    if (accessToken && refreshToken) {
      saveTokens({ accessToken, refreshToken, email, role });
      console.log("토큰 저장 완료");
    }

    return response.data;
  } catch (error) {
    console.error("login error:", error);
    throw error;
  }
};

// 로그아웃 요청
export const logout = async () => {
  try {
    await springApi.post("api/user/logout");
    console.log("로그아웃 성공");
  } catch (error) {
    console.error("logout error:", error);
    throw error;
  }
};

// 회원가입 요청
export const join = async (signupData) => {
  try {
    console.log("회원가입 요청 중");
    const response = await springApi.post("api/user/join", signupData);
    return response.data;
  } catch (error) {
    console.error("join error:", error);
    throw error;
  }
};
