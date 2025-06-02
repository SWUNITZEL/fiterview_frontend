import axios from 'axios';
import { getAccessToken } from '../utils/token';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true,
});

/**
 * @description 요청 인터셉터: accessToken 자동 추가
 * */
api.interceptors.request.use(
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

    const response = await api.post(
        `school-records/upload`,
        formData
    );

    console.log(response.data)

    return response.data;
};

export const getSchoolRecords = async () => {
    const url = `${process.env.REACT_APP_API_URL}school-records/analyze`
    const response = await fetch(url.toString(), {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};