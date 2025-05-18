/**
 * @file Interview.jsx
 * @description 모의면접 실행 페이지
 * @author 이찬우
 * @created 2025-03-27
 * @lastModified 2025-05-18 (업로드 안정성 개선)
 **/

import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./Interview.css";
import { CircleStackIcon } from "@heroicons/react/24/solid";

function Interview() {
    /** 
     * @constant {string} websocketURL - 웹소켓 서버 URL
     * @constant {string} videoUploadURL - 비디오 업로드용 HTTP 서버 URL
     * @constant {string} resultLoadingURL - 결과 페이지 URL
     * @constant {string} lastMent - 면접 종료 멘트 
     * */
    const websocketURL = process.env.REACT_APP_WS_URL;
    const videoUploadURL = `${process.env.REACT_APP_API_URL}`;
    const resultLoadingURL = "";
    const lastMent = "";

    /** 
     * @state {boolean} isLooping - 면접관 영상 반복 여부
     * @state {boolean} recording - 녹화 여부
     * @state {string} question - 서버에서 받아온 질문
     * */
    const [isLooping] = useState(false);
    const [recording, setRecording] = useState(false); 
    const [question, setQuestion] = useState(''); 

    /** 
     * @ref {Object} videoRef - 면접관 비디오 요소 참조 
     * @ref {Object} mediaRecorder - 미디어 레코더 객체 참조
     * @ref {Array} recordedChunks - 현재 녹화 중 조각 저장
     * @ref {Array} allVideoBlobsRef - 녹화 완료된 전체 영상 저장
     * @ref {Object} websocket - 웹소켓 연결 객체
     * @ref {string} preQuestionRef = 웹소켓이 두 번 열려 같은 질문을 두번 하지 않도록 이전 질문 저장
     */
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);   
    const recordedChunksRef = useRef([]);
    const allVideoBlobsRef = useRef([]);
    const websocketRef = useRef(null);
    const preQuestionRef = useRef(""); 

    const encodeWAV = useCallback((audioBuffer) => {
        const numOfChan = audioBuffer.numberOfChannels;
        const length = audioBuffer.length * numOfChan * 2 + 44;
        const buffer = new ArrayBuffer(length);
        const view = new DataView(buffer);

        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + audioBuffer.length * numOfChan * 2, true);
        writeString(view, 8, 'WAVE');

        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numOfChan, true);
        view.setUint32(24, audioBuffer.sampleRate, true);
        view.setUint32(28, audioBuffer.sampleRate * numOfChan * 2, true);
        view.setUint16(32, numOfChan * 2, true);
        view.setUint16(34, 16, true);

        writeString(view, 36, 'data');
        view.setUint32(40, audioBuffer.length * numOfChan * 2, true);

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
    }, []);

    const writeString = (view, offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };

    const sendAudioToServer = (audioBlob) => {
        if (websocketRef.current?.readyState === WebSocket.OPEN) {
            const reader = new FileReader();
            reader.onload = () => {
                websocketRef.current.send(reader.result);
            };
            reader.readAsArrayBuffer(audioBlob);
        }
    };

    const extractAndSendAudio = useCallback((videoBlob) => {
        const audioContext = new AudioContext();
        const reader = new FileReader();
        reader.readAsArrayBuffer(videoBlob);
        reader.onloadend = async () => {
            try {
                const audioBuffer = await audioContext.decodeAudioData(reader.result);
                const wavBlob = encodeWAV(audioBuffer);
                sendAudioToServer(wavBlob);
            } catch (err) {
                console.error("오디오 추출 실패:", err);
            }
        };
    }, [encodeWAV]);

    /**
     * @function stopAndFlushRecording
     * @description 마지막 질문 후 녹화가 완료될 때까지 기다린 후 비디오 저장
     */
    const stopAndFlushRecording = useCallback(() => {
        return new Promise((resolve) => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                    allVideoBlobsRef.current.push(blob);
                    recordedChunksRef.current = [];
                    extractAndSendAudio(blob);
                    resolve();
                };
                mediaRecorderRef.current.stop();
            } else {
                resolve();
            }
        });
    }, [extractAndSendAudio]);

    /**
     * @function sendAllVideosToServer
     * @description 페이지 종료 시 저장된 비디오를 한 번에 서버로 전송
     */
    const sendAllVideosToServer = useCallback(async () => {
        const formData = new FormData();
        allVideoBlobsRef.current.forEach((blob, idx) => {
            formData.append(`video${idx}`, blob, `interview_part${idx}.webm`);
        });

        try {
            const response = await fetch(videoUploadURL, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            console.log('업로드 성공:', result);
            return result;
        } catch (error) {
            console.error('업로드 에러:', error);
            throw error;
        }
    }, [videoUploadURL]);

    useEffect(() => {
        const originalBodyStyle = document.body.style.backgroundColor;
        document.body.style.backgroundColor = 'var(--background-color)';
        return () => {
            document.body.style.backgroundColor = originalBodyStyle;
        };
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("자동 재생이 차단됨: ", error);
            });
        }
    }, []);

    /**
     * @useEffect 웹소켓 연결 및 메시지 처리
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            websocketRef.current = new WebSocket(websocketURL);

            websocketRef.current.onopen = () => {
                console.log('WebSocket connection opened');
            };

            websocketRef.current.onmessage = (event) => {
                const receiveText = event.data;
                console.log("받은 질문:", receiveText);
                setQuestion(receiveText);

                const playTTSAndRecord = () => {
                    preQuestionRef.current = receiveText;
                    const utterance = new SpeechSynthesisUtterance(receiveText);
                    utterance.lang = 'ko-KR';
                    utterance.onend = () => {
                        if (receiveText !== lastMent) {
                            startRecording();
                        }
                    };
                    speechSynthesis.speak(utterance);
                };

                if (receiveText !== preQuestionRef.current) {
                    playTTSAndRecord();
                }

                if (receiveText === lastMent) {
                    websocketRef.current.close();
                }
            };

            websocketRef.current.onclose = async () => {
                alert('면접이 완료되었습니다. 면접이 저장되기 전까지 페이지를 벗어나지 마세요.');
                await stopAndFlushRecording(); // 녹화 종료 대기
                await sendAllVideosToServer(); // 영상 업로드
                alert('파일이 저장이 완료되었습니다.');
                window.location.replace(resultLoadingURL);
            };

            websocketRef.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            return () => {
                if (websocketRef.current) {
                    websocketRef.current.close();
                    clearTimeout(timer);
                }
            };
        }, 2000);
    }, [stopAndFlushRecording, sendAllVideosToServer, websocketURL]);

    const handleVideoEnd = () => {
        if (isLooping && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    const startRecording = async () => {
        setRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunksRef.current.push(event.data);
            }
        };

        mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
        setRecording(false);
        if (!mediaRecorderRef.current) return;
        mediaRecorderRef.current.stop();
    };

    return (
        <div className='interview'>
            <div className='header'>
                <button onClick={recording ? stopRecording : startRecording} className={recording ? 'record-state-after' : 'record-state'}>
                    <h4><span><CircleStackIcon /></span>&nbsp; {recording ? '답변 완료' : '답변 시작'}</h4>
                </button>
                <h3>{question}</h3>
            </div>
            <video 
                ref={videoRef}
                src="videos/interviewer.mp4"
                className={recording ? 'interviewer-c' : 'interviewer-w'}
                onEnded={handleVideoEnd}
                style={{ pointerEvents: "none" }}
            />
        </div>
    );
}

export default Interview;
