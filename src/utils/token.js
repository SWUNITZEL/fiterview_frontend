// utils/token.js
export function setAccessToken(token) {
  sessionStorage.setItem('accessToken', token);
}

export function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

export function removeAccessToken() {
  sessionStorage.removeItem('accessToken');
}

export function setRefreshToken(token) {
  sessionStorage.setItem('refreshToken', token);
}

export function getRefreshToken() {
  return sessionStorage.getItem('refreshToken');
}

export function removeRefreshToken() {
  sessionStorage.removeItem('refreshToken');
}
