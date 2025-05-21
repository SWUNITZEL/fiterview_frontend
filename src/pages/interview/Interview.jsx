/**
 * @file Interview.jsx
 * @description 모의면접 실행 페이지
 * @author 이찬우
 * @created 2025-03-27
 * @lastModified 2025-04-02
**/

import React, { useState, useEffect, useRef } from 'react';
import "./Interview.css";
import { CircleStackIcon } from "@heroicons/react/24/solid";

/**
 * @component
 * @description 모의 면접 실행 컴포넌트
 * @returns {JSX.Element} 면접 페이지 UI
 */

function Interview() {
    /** 
     * @constant {string} websocketURL - 웹소켓 서버 URL
     * @constant {string} videoUploadURL - 비디오 업로드용 HTTP 서버 URL
     * @constant {string} resultLoadingURL - 결과 페이지 URL
     * @constant {string} lastMent - 면접 종료 멘트 
     * */
    const websocketURL = process.env.REACT_APP_WS_URL
    const videoUploadURL = `${process.env.REACT_APP_API_URL}`
    const resultLoadingURL = ""
    const lastMent = "수고하셨습니다."

    /** 
     * @state {boolean} recording - 녹화 여부
     * @state {string} question - 서버에서 받아온 질문
     * @state {Blob} videoChunks - 녹화된 비디오 Blob들, 면접 종료 후 한번에 전송
     * */
    const [recording, setRecording] = useState(false); 
    const [question, setQuestion] = useState(''); 
    const videoChunks = useRef([])

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

    useEffect(() => {
        const originalBodyStyle = document.body.style.backgroundColor;
        document.body.style.backgroundColor = 'var(--background-color)';
        return () => {
            document.body.style.backgroundColor = originalBodyStyle;
        };
    }, []);

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
            console.log(receiveText)
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
                alert('면접이 완료되었습니다. 면접이 저장되기 전까지 페이지를 벗어나지 마세요.');
                console.log(`websocket.current.onclose에서의 videoChunks 확인: ${videoChunks}`)
                sendAllVideosToServer();
                mediaRecorder.current?.stream?.getTracks().forEach(track => track.stop());
                mediaRecorder.current = null; // 스트림 해제
                alert('파일이 저장이 완료되었습니다.');
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
        setRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

        // 녹화 이벤트 발생 시 실행
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
        mediaRecorder.current.stop();

        mediaRecorder.current.onstop = () => {
            const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
            videoChunks.current.push(blob);
            recordedChunks.current = []; //레코드 저장 공간 리셋
            console.log(`videoChunks update: ${videoChunks}`)
            
            // 서버에 blob 데이터 전송
            extractAndSendAudio(blob);
        };
    };

    /**
     * @function extractAndSendAudio
     * @description 답변 종료 시 저장된 비디오의 오디오를 추출하고 sendAudioToServer 호출
     * 
     * @function sendAudioToServer
     * @description 답변 종료 시 저장된 비디오의 오디오를 소켓으로 전송
     */
    const encodeWAV = (audioBuffer) => {
        const numOfChan = audioBuffer.numberOfChannels;
        const length = audioBuffer.length * numOfChan * 2 + 44;
        const buffer = new ArrayBuffer(length);
        const view = new DataView(buffer);
    
        // RIFF chunk descriptor
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + audioBuffer.length * numOfChan * 2, true);
        writeString(view, 8, 'WAVE');
    
        // FMT sub-chunk
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true); // SubChunk1Size
        view.setUint16(20, 1, true);  // PCM
        view.setUint16(22, numOfChan, true);
        view.setUint32(24, audioBuffer.sampleRate, true);
        view.setUint32(28, audioBuffer.sampleRate * numOfChan * 2, true);
        view.setUint16(32, numOfChan * 2, true);
        view.setUint16(34, 16, true); // bits/sample
    
        // data sub-chunk
        writeString(view, 36, 'data');
        view.setUint32(40, audioBuffer.length * numOfChan * 2, true);
    
        // write interleaved PCM samples
        let offset = 44;
        for (let i = 0; i < audioBuffer.length; i++) {
            for (let channel = 0; channel < numOfChan; channel++) {
                const sample = audioBuffer.getChannelData(channel)[i];
                const s = Math.max(-1, Math.min(1, sample));
                view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                offset += 2;
            }
        }
    
        return new Blob([view], { type: 'audio/wav' });
    };
    
    const writeString = (view, offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };
    
    const extractAndSendAudio = (videoBlob) => {
        const audioContext = new AudioContext();
        const reader = new FileReader();
        reader.readAsArrayBuffer(videoBlob);
        reader.onloadend = async () => {
            try {
                const audioBuffer = await audioContext.decodeAudioData(reader.result);
                const wavBlob = encodeWAV(audioBuffer); // <-- WAV로 인코딩
                sendAudioToServer(wavBlob);
            } catch (err) {
                console.error("오디오 추출 실패:", err);
            }
        };
    };
    const sendAudioToServer = (audioBlob) => {
        if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
            const reader = new FileReader();
            reader.onload = function() {
                websocket.current.send(reader.result);
            };
            reader.readAsArrayBuffer(audioBlob);
        }
    };

    /**
     * @function sendAllVideosToServer
     * @description 페이지 종료 시 저장된 비디오를 한 번에 서버로 전송
     */
    const sendAllVideosToServer = () => {
        const formData = new FormData();
        console.log("sendAllVideosToServer")
        console.log(`videoChunks: ${videoChunks}`)
        videoChunks.current.forEach((blob, index) => {
            formData.append(`video${index}`, blob, `interview_part${index}.webm`);
        });
        fetch(videoUploadURL, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => console.log('Upload successful:', data))
          .catch(error => console.error('Upload error:', error));
    };

    return (
        <div className='interview'>
            {/* 질문/녹화 버튼 컨테이너 */}
            <div className='header'>
                <button onClick={recording ? stopRecording : startRecording} className= {recording ? 'record-state-after' : 'record-state'}>
                    <h4><span><CircleStackIcon /></span> &nbsp; {recording ? '답변 완료' : '답변 시작'}</h4>
                </button>
                <h3>{question}</h3>
            </div>
            {/* 면접관 영상 */}
            <video src="videos\interviewer.mp4" alt="interviewer_video" className={recording ? 'interviewer-c' : 'interviewer-w'} style={{ pointerEvents: "none" }}/>
        </div>
    );
}

export default Interview;