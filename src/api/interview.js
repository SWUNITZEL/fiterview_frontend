import axios from 'axios';

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
export const startInterview = async (payload) => {
  const INTERVIEW_CONFIG_URL = `${process.env.REACT_APP_API_URL}interview/start`;

  const response = await fetch(INTERVIEW_CONFIG_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("서버에 설정을 저장하는 데 실패했습니다.");
  }

  return response.json();
};


/**
 * @description 캡처된 이미지를 면접 대기실 API에 전송하여 면접 세션 ID를 요청합니다.
 * 
 * @async
 * @function sendCaptureImage
 * @param {string} base64Image - base64 형식의 캡처 이미지 데이터 (data URL)
 * @throws {Error} 서버 응답이 실패했을 경우 에러를 던집니다.
 * @returns {Promise<Object>} 서버에서 반환된 JSON 데이터 (예: { interviewId: string })
 */

export const sendCaptureImage = async (base64Image) => {
    const INTERVIEW_INIT_URL = `${process.env.REACT_APP_API_URL}interview/waiting-room`;
    const blob = await (await fetch(base64Image)).blob();
    const formData = new FormData();
    formData.append('image', blob, 'capture.png');

    const response = await axios.post(INTERVIEW_INIT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};


/**
 * 비디오 Blob을 서버에 POST 전송하는 함수
 * @param {Blob} videoBlob 
 * @returns {Promise<object>} 서버 응답 JSON
 */
export async function uploadVideoApi(videoBlob, interviewID) {
    const VIDEO_UPLOAD_URL = `${process.env.REACT_APP_API_URL}api/video-upload`;
    const formData = new FormData();
    formData.append('file', videoBlob, 'video.webm');
    formData.append('interview_id', interviewID);

    const response = await fetch(VIDEO_UPLOAD_URL, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
    }
    return response.json();
}
