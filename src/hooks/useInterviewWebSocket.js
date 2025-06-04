import { useEffect, useRef, useState } from 'react';
import {convertWebmToWav} from "../utils/toWav"

export function useInterviewWebSocket({ interviewId, onReceiveQuestion, onComplete }) {
    const websocket = useRef(null);

    const [isConnected, setIsConnected] = useState(false);
    const [question, setQuestion] = useState('');
    const [questionID, setQuestionID] = useState('');
    const [totalQuestions, setTotalQuestions] = useState(null);
    const [questionIndex, setQustionIndex] = useState(null);
    const [hasFollowUp, setHasFollowUp]=useState(false);
    const [readyForChainQuestion, setReadyForChainQuestion] = useState(false);

    useEffect(() => {
        websocket.current = new WebSocket(`${process.env.REACT_APP_WS_URL}interview/${interviewId}`);

        websocket.current.onopen = () => {
            console.log('WebSocket 연결 열림');
        };

        websocket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("받아온 메세지: ",data)

            if (data.type === 'question') {
                onReceiveQuestion(data.question_text);
            } else if (data.type === 'complete') {
                onComplete();
            }

            if (!isConnected) {
                setIsConnected(true);
            }

            setQuestionID(data.question_id)
            setTotalQuestions(data.total_questions)
            setQustionIndex(data.question_index)
            setQuestion(data.question_text)
            setHasFollowUp(data.has_follow_up)
            if(readyForChainQuestion){
                setReadyForChainQuestion(false)
            }

        };

        websocket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.current.onclose = () => {
            console.log('WebSocket 연결 종료됨');
        };

        return () => {
            websocket.current?.close();
        };
    }, [interviewId]);

    const sendAudio = async (videoBlob) => {
        try {
            const wavBlob = await convertWebmToWav(videoBlob);
            if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
                websocket.current.send(wavBlob);
                console.log("WAV audio blob 전송 완료");
                if (hasFollowUp) {
                    setReadyForChainQuestion(true)
                    setHasFollowUp(false)
                }
            } else {
                console.warn("WebSocket이 열려있지 않음");
            }
        } catch (err) {
            console.error("audio 변환 또는 전송 실패:", err);
        }
    };

    //    const [question, setQuestion] = useState('');
    // const [totalQustions, setTotalQustions] = useState(null);
    // const [questionIndex, setQustionIndex] = useState(null);
    // const [hasFollowUp, setHasFollowUp]=useState(false);


    return { sendAudio, isConnected, questionID, question, totalQuestions, questionIndex, readyForChainQuestion };
}
