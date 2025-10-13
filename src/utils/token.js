// src/utils/token.js

// 통합 저장 함수
export function saveTokens({ accessToken, refreshToken, email, role }) {
  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("refreshToken", refreshToken);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("role", role);
  console.log("모든 토큰 및 사용자 정보 저장 완료");
}

// 개별 접근용 함수
export function getAccessToken() {
  return sessionStorage.getItem("accessToken");
}

export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken");
}

export function getEmail() {
  return sessionStorage.getItem("email");
}

export function getRole() {
  return sessionStorage.getItem("role");
}

// 삭제용 함수
export function clearTokens() {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("role");
}
