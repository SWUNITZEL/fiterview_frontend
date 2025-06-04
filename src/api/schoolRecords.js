import axios from 'axios';
import { getAccessToken } from '../utils/token';

const fastapi_api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true,
});
const spring_api = axios.create({
  baseURL: process.env.REACT_APP_SRIPING_API_URL,
  // withCredentials: true,
});

/**
 * @description 요청 인터셉터: accessToken 자동 추가
 * */
fastapi_api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();  // sessionStorage나 localStorage에서 꺼내는 함수
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
spring_api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();  // sessionStorage나 localStorage에서 꺼내는 함수
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);




export const setSchoolRecords = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fastapi_api.post(
        `school-records/upload`,
        formData
    );

    console.log(response.data)

    return response.data;
};

export const getSchoolRecords = async () => {
  try {
    const response = await spring_api.get('school-records/analyze');
    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error.response?.status || error.message}`);
  }
};