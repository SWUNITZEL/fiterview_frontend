/**
 * @file Interview.jsx
 * @description 모의면접 실행 페이지
 * @author 이찬우
 * @created 2025-03-27
 * @lastModified 2025-04-02
**/

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useMediaStream from '../../hooks/useMediaStream'
import { Container, Button, Chip } from '@mui/material';
import "./Interview.css";

/**
 * @component
 * @description 모의 면접 실행 컴포넌트
 * @returns {JSX.Element} 면접 페이지 UI
 */

function Interview() {

    /**
     * @constant {object} location - 현재 페이지의 라우팅 정보 객체
     * @property {object} state - 이전 페이지에서 전달된 상태 정보
     * @property {string} state.interviewId - 면접 세션 고유 ID
     * @property {string} state.selectedMic - 선택된 마이크 디바이스 ID
     * @property {string} state.selectedCam - 선택된 카메라 디바이스 ID
     */
    const location = useLocation();
    const { interviewId, selectedMic, selectedCam } = location.state || {};
    const { stream } = useMediaStream(selectedMic, selectedCam)

    /** 
     * @constant {string} websocketURL - 웹소켓 서버 URL
     * @constant {string} resultLoadingURL - 결과 페이지 URL
     * @constant {string} lastMent - 면접 종료 멘트 
     * */
    const websocketURL = `${process.env.REACT_APP_WS_URL}interview/1`
    const resultLoadingURL = "/home"
    const lastMent = "수고하셨습니다."

    /** 
     * @state {boolean} recording - 녹화 여부
     * @state {string} question - 서버에서 받아온 질문
     * */
    const [recording, setRecording] = useState(false); 
    const [question, setQuestion] = useState(''); 
    const [totalQustions, setTotalQustions] = useState(4)
    const [completedQustions, setCompletedQustions] = useState(1)

    /** 
     * @ref {Object} mediaRecorder - 미디어 레코더 객체 참조
     * @ref {Array} recordedChunks - 녹화된 데이터 저장
     * @ref {Object} websocket - 웹소켓 연결 객체
     * @var {string} preQuestion = 웹소켓이 두 번 열려 같은 질문을 두번 하지 않도록 이전 질문 저장
    */
    const mediaRecorder = useRef(null);   
    const recordedChunks = useRef([]);
    const websocket = useRef(null);
    let preQuestion = ""

    /**
     * @useEffect 웹소켓 연결 및 메시지 처리
     * @description
     * - 웹소켓 연결을 생성하고 면접 질문을 수신
     * - 면접 질문을 음성으로 변환하여 실행
     * - 마지막 질문이면 웹소켓 연결 종료 및 결과 페이지 이동
     */

    useEffect(() => {
        const timer = setTimeout(() => {
            websocket.current = new WebSocket(websocketURL);
            // onopen: 웹소켓 연결 성공 후 실행
            websocket.current.onopen = () => console.log('WebSocket connection opened');

            // onmessage: 파일 수신 완료 후 실행
            websocket.current.onmessage = (event) => {
            
            let receiveText = event.data;
            console.log(`질문 수신 완료: ${receiveText}`)
            setQuestion(receiveText)

            /** 
             * @function playTTSAndRecord
             * @description TTS 실행, 실행 후 비디오 녹화 시작
             * */
            function playTTSAndRecord() {
                preQuestion = receiveText

                var utterance = new SpeechSynthesisUtterance(receiveText);
                utterance.lang = 'ko-KR'; // 한글로 설정
                
                utterance.onend = () => {
                    if (receiveText !== lastMent){
                        startRecording();
                    }
                };
                speechSynthesis.speak(utterance);
            }

            // 이전 질문과 현재 질문이 같지 않다면 TTS 실행
            if (receiveText !== preQuestion){
                playTTSAndRecord() //TTS 실행
            }
            
            // 만일 받아온 텍스트가 마무리 멘트라면
            if (receiveText === lastMent){
                websocket.current.close() // 웹소켓 연결 종료
            }
            };

            // onclose: 연결 종료시 실행
            websocket.current.onclose = async () => {
                alert('면접이 완료되었습니다.');
                mediaRecorder.current?.stream?.getTracks().forEach(track => track.stop());
                mediaRecorder.current = null; // 스트림 해제
                window.location.replace(resultLoadingURL);
            };

            // onerror: 에러가 발생시 실행
            websocket.current.onerror = (error) => {
                console.error('WebSocket error:', error); // 에러 발생 메세지
            };
        
            // 브라우저 주소 이동 등으로 연결이 종료되면
            return () => {
            if (websocket.current) {
                console.log('Closing WebSocket on unmount');
                websocket.current.close();
                clearTimeout(timer)
            }
            };
        },2000)
    }, []);

    // 녹화 시작시 실행될 함수
    const startRecording = async () => {
        if (!stream) {
            console.warn("Stream이 아직 초기화되지 않았습니다.");
            return;
        }

        setRecording(true);
        mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

        mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.current.push(event.data);
            }
        };
        mediaRecorder.current.start();
    };

    /**
     * @function stopRecording
     * @description 답변 종료 시 비디오 저장 후 레코딩 상태변수들 초기화, extractAndSendAudio 실행
     */
    const stopRecording = () => {
        setRecording(false);
        
        mediaRecorder.current.onstop = () => {
            const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
            console.log('녹화된 블롭 크기:', blob.size);
            if (blob.size > 0) {
                sendVideoToWebSocket(blob);
            } else {
                console.warn('녹화된 비디오가 비어있습니다.');
            }
            recordedChunks.current = [];
        };

        mediaRecorder.current.stop(); // 반드시 onstop 설정 후 stop 호출
    };


    /**
     * @function sendVideoToServer
     * @description 답변 종료 시 저장된 비디오를 소켓으로 전송
     */    
   const sendVideoToWebSocket = (videoBlob) => {
    if (websocket.current.readyState === WebSocket.OPEN) {
        const reader = new FileReader();
        reader.onload = () => {
            websocket.current.send(reader.result);
            console.log("비디오 전송 수신 완료")
        };
        reader.readAsArrayBuffer(videoBlob);
    } else {
        console.error('WebSocket 연결이 열려 있지 않습니다.');
    }
};


    return (
        <Container maxWidth={false}
              style={{
                backgroundColor: "var(--background-color)",
                minHeight: "100vh",
                padding: "0 0",
                overflow: "hidden",
                display:"flex"
              }}>
            <div className='side-margin'></div>
            {/* 질문/녹화 버튼 컨테이너 */}
            <div className='interview-container'>
                <video autoPlay muted loop playsInline className="bg-video">
                    <source src="/videos/interviewer.mp4" type="video/mp4" />
                    브라우저가 동영상을 지원하지 않습니다.
                </video>
                <Chip className="recording" label="녹화 중" sx={{backgroundColor:"var(--error-20)", display:recording?"flex":"none"}} />
                <div className='contents-container'>
                    <div className='text-container'>
                        <Chip className="progress" label={`${completedQustions}/${totalQustions}`} sx={{backgroundColor:"var(--background-color)"}} />
                        <div className='question-container subtitle-20-bold'>
                            Q. {question}
                        </div>
                        <Button
                              onClick={recording ? stopRecording : startRecording}
                            //   disabled={!recording}
                              className="complete-btn"
                              size="large"
                              sx={{ borderRadius: '8px', padding: '8px 16px', marginTop: '20px' }}
                            >
                        {recording ? '답변 완료' : '답변 시작'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className='side-margin'></div>
        </Container>
    );
}

export default Interview;