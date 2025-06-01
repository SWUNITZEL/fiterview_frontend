// utils/token.js
export function saveAccessToken(token) {
  sessionStorage.setItem('accessToken', token);
}

export function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

export function removeAccessToken() {
  sessionStorage.removeItem('accessToken');
}

export function saveRefreshToken(token) {
  sessionStorage.setItem('refreshToken', token);
}

export function getRefreshToken() {
  return sessionStorage.getItem('refreshToken');
}

export function removeRefreshToken() {
  sessionStorage.removeItem('refreshToken');
}
