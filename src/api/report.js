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

/**
 * @description 인터뷰 ID를 전달해 답변 분석 결과를 요청합니다.
 * 
 * @async
 * @function getReportAnswers
 * @throws {Error} 서버 응답이 실패했을 경우 에러를 던집니다.
 * @returns {Promise<Object>} 서버에서 반환된 JSON 데이터 (예: { word_list: list, ... })
 */
export const getReportAnswers = async (interviewID) => {

  try{
      const response = await fastapiApi.get(`report/${interviewID}/answer_result`,
        {"interview_id":interviewID}
      );
      console.log(response.data)

      return response.data;
  } catch (error) {
  throw new Error(`HTTP error! status: ${error.response?.status || error.message}`);
  }
}
    