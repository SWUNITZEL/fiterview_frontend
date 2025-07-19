import axios from 'axios';
import { getAccessToken } from '../utils/token';

/**
 * @description 면접 설정 정보를 백엔드에 저장하고 면접 세션을 시작합니다.
 * 
 * @async
 * @function startInterview
 * @param {Object} payload - 면접 설정 데이터
 * @param {string} payload.documentId - 사용자 문서 ID (예: 학교-학과-날짜)
 * @param {string} payload.university - 학교 이름
 * @param {string} payload.department - 학과 이름
 * @param {number} payload.questionCount - 질문 개수
 * @param {string} payload.interviewDate - 면접 날짜 (YYYY-MM-DD 형식)
 * @param {Array<string>} payload.persona - 선택한 면접관 ID 목록
 * @throws {Error} 서버 응답이 실패했을 경우 에러를 던집니다.
 * @returns {Promise<Object>} 서버에서 반환된 JSON 데이터 (예: { interviewId: string, ... })
 */

const fastapiApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/**
 * @description 요청 인터셉터: accessToken 자동 추가
 * */
fastapiApi.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();  // sessionStorage나 localStorage에서 꺼내는 함수
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const startInterview = async (payload) => {
  try {
    const response = await fastapiApi.post(
      'interview/start',
      payload
    );

    console.log('저장 완료!', response.data);

    return response.data.result;
  } catch (error) {
    console.error('❌ startInterview error:', error);

    throw error;  // 상위에서 또 처리할 수 있도록 재던짐
  }
};



/**
 * @description 캡처된 이미지와 면접 조합을 면접 대기실 API에 전송하여 면접 세션 ID를 요청합니다.
 * 
 * @async
 * @function sendCaptureAndCombination
 * @param {string} base64Image - base64 형식의 캡처 이미지 데이터 (data URL)
 * @throws {Error} 서버 응답이 실패했을 경우 에러를 던집니다.
 * @returns {Promise<Object>} 서버에서 반환된 JSON 데이터 (예: { interviewId: string })
 */

export const sendCaptureAndCombination = async (base64Image, combineId) => {
    console.log("combineId", combineId)
    const blob = await (await fetch(base64Image)).blob();
    const formData = new FormData();
    console.log("file:",URL.createObjectURL(blob))

    formData.append('file', blob, 'file.png');
    formData.append('combineId', combineId); 
    try {
      const response = await fastapiApi.post('/interview/waiting-room', formData);
      console.log('면접 정보 받아오기 성공:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ 면접 정보 받아오기 실패:', error);

    throw error;  // 상위에서 또 처리할 수 있도록 재던짐
    }
};


/**
 * 질문 생성 요청
 * @param {string} interviewId 
 * @returns {Promise<object>} 서버 응답 JSON
 */
export async function reqQuestions(interviewId) {
    console.log("interviewId:",interviewId)

    try {
        const response = await fastapiApi.post(`interview/${interviewId}/persona/question`);
        return response.data;
    } catch (error) {
        throw new Error(`서버 오류: ${error.response?.status || error.message}`);
    }
}

/**
 * 비디오 Blob을 서버에 POST 전송하는 함수
 * @param {Blob} videoBlob 
 * @returns {Promise<object>} 서버 응답 JSON
 */
export async function uploadVideoApi(videoBlob, interviewID, questionID) {
    const formData = new FormData();
    formData.append('file', videoBlob, 'video.webm');
    formData.append('questionId', questionID);

    console.log("file:",URL.createObjectURL(videoBlob))
    console.log("questionId:",questionID)

    try {
      const response = await fastapiApi.post(`interview/${interviewID}/analysis-video`, formData);
      return response.data;
    } catch (error) {
        throw new Error(`서버 오류: ${error.response?.status || error.message}`);
    }
}

/**
 * 웹소켓 연결 전, access 토큰으로 웹소켓 인증 전용 토큰을 발급받는 함수
 * @returns {Promise<string>} 웹소켓 연결에 사용할 짧은 토큰 (socket token)
 */
export const getWebsocketToken = async () => {
  try{
      const response = await fastapiApi.get(`users/socket-token`);
      console.log(response.data)

      return response.data.result
  } catch (error) {
  throw new Error(`HTTP error! status: ${error.response?.status || error.message}`);
  }
}