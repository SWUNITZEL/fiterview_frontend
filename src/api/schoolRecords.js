import axios from 'axios';
import { getAccessToken } from '../utils/token';

const fastapiApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true,
});
const springApi = axios.create({
  baseURL: process.env.REACT_APP_SRIPING_API_URL,
  // withCredentials: true,
});

/**
 * @description 요청 인터셉터: accessToken 자동 추가
 * */
fastapiApi.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken(); 
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

springApi.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();  
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

    const response = await fastapiApi.post(`school-records/upload`,formData);

    console.log(response.data)

    return response.data;
};

export const getSchoolRecords = async () => {
  try {
    const response = await springApi.get('school-records/analyze');
    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error.response?.status || error.message}`);
  }
};