/**
 * 쿠키에서 특정 키의 값을 추출하는 함수
 * @param {string} name 쿠키의 이름
 * @returns {string | null} 쿠키 값 또는 없으면 null
 */
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

/**
 * 쿠키를 설정하는 함수
 * @param {string} name 쿠키 이름
 * @param {string} value 쿠키 값
 * @param {number} days 유효 기간 (일 단위)
 */
export const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

/**
 * 쿠키를 삭제하는 함수
 * @param {string} name 쿠키 이름
 */
export const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-1; path=/;`;
};
