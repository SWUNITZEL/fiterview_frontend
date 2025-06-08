import axios from 'axios';
import { getAccessToken } from '../utils/token';

const fastapiApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const springApi = axios.create({
  baseURL: process.env.REACT_APP_SRIPING_API_URL,
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

/**
 * @description 각 보고서에 대한 결과값 반환 요청
 * */
export const fetchNonverbalReport = async (interviewId) => {
  const response = await springApi.get(`/report/${interviewId}/result`);
  console.log("response: ", response)

  return response.data;
};

export const fetchDeliveryReport = async (interviewId) => {
  const response = await springApi.get(`/report/${interviewId}/`);
  console.log("response: ", response)

  return response.data;
};

export const fetchAnswerReport = async (interviewId) => {
  const response = await springApi.get(`/report/${interviewId}/answer_result`);
  console.log("response: ", response)

  return response.data;
};
