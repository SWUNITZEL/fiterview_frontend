import axios from 'axios';
import { getAccessToken } from '../utils/token';


const springApi = axios.create({
  baseURL: process.env.REACT_APP_SRIPING_API_URL,
  withCredentials: true,
});
const fastapiApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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


export const fetchNonverbalReport = async (interviewId) => {
  const response = await axios.get(`/api/report/nonverbal/${interviewId}`);
  return response.data;
};


/**
 * @description 인터뷰 ID를 전달해 전달력 분석 결과를 요청합니다.
 * 
 * @async
 * @function getReportExpressiveness
 * @throws {Error} 서버 응답이 실패했을 경우 에러를 던집니다.
 * @returns {Promise<Object>} 서버에서 반환된 JSON 데이터 (예: { word_list: list, ... })
 */
export const getReportExpressiveness = async (interviewID) => {

  try{
      const response = await springApi.get(`report/${interviewID}/result`,null);
      console.log(response.data)

      return response.data;
  } catch (error) {
  throw new Error(`HTTP error! status: ${error.response?.status || error.message}`);
  }
    
};
