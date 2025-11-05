import { fastapiApi, springApi } from './client';

/**
 * @description 인터뷰 ID를 전달해 신체언어 분석 결과를 요청합니다.
 * 
 * @async
 * @function getReportNonverbal
 * @throws {Error} 서버 응답이 실패했을 경우 에러를 던집니다.
 * @returns {Promise<Object>} 서버에서 반환된 JSON 데이터 (예: { word_list: list, ... })
 */
export const getReportNonverbal = async (interviewId) => {

  try{
      const response = await springApi.post(`report/${interviewId}/nonverbal-communication`,{"interviewId":interviewId});
      console.log(response.data)

      return response.data;
  } catch (error) {
  throw new Error(`HTTP error! status: ${error.response?.status || error.message}`);
  }
    
};

/**
 * @description 인터뷰 ID를 전달해 전달력 분석 결과를 요청합니다.
 * 
 * @async
 * @function getReportDelivery
 * @throws {Error} 서버 응답이 실패했을 경우 에러를 던집니다.
 * @returns {Promise<Object>} 서버에서 반환된 JSON 데이터 (예: { word_list: list, ... })
 */
export const getReportDelivery = async (interviewId) => {
  try{
      const response = await springApi.post(`report/${interviewId}/transmission`,{"interviewId":interviewId});
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
export const getReportAnswers = async (interviewId) => {
  try{
      const formData = new FormData();
      formData.append('interview_id', interviewId);
      const response = await fastapiApi.post(`report/${interviewId}/answer_result`, formData);
      console.log(response.data)

      return response.data;
  } catch (error) {
  throw new Error(`HTTP error! status: ${error.response?.status || error.message}`);
  }
}
    