// utils/token.js
export function saveAccessToken(token, user) {
  sessionStorage.setItem('accessToken', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}

export function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

export function removeAccessToken() {
  sessionStorage.removeItem('accessToken');
}
