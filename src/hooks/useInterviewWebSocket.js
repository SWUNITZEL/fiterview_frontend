import { useEffect, useRef, useState } from 'react';
import { convertWebmToWav } from "../utils/toWav";
import { LASTMENT, VIDEO_UPLOAD_REQ, STT_ERROR_MESSAGE } from "../data/interview";
import { reqQuestions, getWebsocketToken } from "../api/interview"; // 이 부분도 상대경로 맞게 조정

export function useInterviewWebSocket({ interviewId, onReceiveQuestion, onComplete }) {
  const websocket = useRef(null);

  const [isConnected, setIsConnected] = useState(false);
  const [question, setQuestion] = useState('');
  const [questionID, setQuestionID] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [questionIndex, setQustionIndex] = useState(null);
  const [hasFollowUp, setHasFollowUp] = useState(false);
  const [readyForChainQuestion, setReadyForChainQuestion] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // reqQuestions 완료 여부

  useEffect(() => {
    if (!interviewId) return;

    const init = async () => {
      try {
        const data = await reqQuestions(interviewId);
        console.log("질문생성: ",data)
        setIsInitialized(true);

        // 웹소켓 전용 인증 토큰 발급
        const socketToken = await getWebsocketToken()

        // 🔌 WebSocket 연결
        websocket.current = new WebSocket(`${process.env.REACT_APP_WS_API_URL}${interviewId}?socket_token=${socketToken}`);

        websocket.current.onopen = () => {
          console.log('WebSocket 연결 열림');
        };

        websocket.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("받아온 메시지:", data);

          if (data.question_text === LASTMENT) {
            onReceiveQuestion?.(data.question_text)
            setQuestion(data.question_text);
            websocket.current?.close();
            setIsConnected(false);
            onComplete?.();
            return;
          }

          if (data.question_text === VIDEO_UPLOAD_REQ) {
            onReceiveQuestion?.(data.question_text)
            setQuestion(data.question_text);
            return;
          }

          if (data.question_text === STT_ERROR_MESSAGE) {
            onReceiveQuestion?.(data.question_text)
            setQuestion(data.question_text);
            return;
          }

          if (data.type === 'question'||data.type === 'complete') {
            onReceiveQuestion?.(data.question_text);
            setQuestionID(data.question_id);
            setTotalQuestions(data.total_questions);
            setQustionIndex(data.question_index);
            setQuestion(data.question_text);
            setHasFollowUp(data.has_follow_up);
            setReadyForChainQuestion(false);
          }

          if (!isConnected) {
            setIsConnected(true);
          }

          
        };

        websocket.current.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        websocket.current.onclose = (event) => {
          console.log('WebSocket 연결 종료됨', event.code);
        };
      } catch (error) {
        console.error("초기 질문 요청 실패:", error);
      }
    };

    init();

    return () => {
      websocket.current?.close();
    };
  }, [interviewId]);

  // 🎙️ 오디오 전송
  const sendAudio = async (videoBlob) => {
    try {
      const wavBlob = await convertWebmToWav(videoBlob);
      if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
        websocket.current.send(wavBlob);
        console.log("WAV audio blob 전송 완료");

        if (hasFollowUp) {
          setReadyForChainQuestion(true);
          setHasFollowUp(false);
        }
      } else {
        console.warn("WebSocket이 열려있지 않음");
      }
    } catch (err) {
      console.error("audio 변환 또는 전송 실패:", err);
    }
  };

  return {
    sendAudio,
    isConnected,
    questionID,
    question,
    totalQuestions,
    questionIndex,
    readyForChainQuestion,
    isInitialized,
  };
}
