/**
 * @file Interview.jsx
 * @description 모의면접 실행 페이지
 * @author 이찬우
 * @created 2025-03-27
 * @lastModified 2025-06-04
**/

import { useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useMediaStream from '../../hooks/useMediaStream';
import { useInterviewWebSocket } from '../../hooks/useInterviewWebSocket';
import { useMediaRecorder } from '../../hooks/useMediaRecorder';
import { useVideoUpload } from '../../hooks/useVideoUpload';
import { Container, Button, Chip, LinearProgress } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import { PATH } from "../../data/paths";

import "./Interview.css";

function Interview() {
    const location = useLocation();
    // const { interviewId, selectedMic, selectedCam } = location.state || {};
    const { selectedMic, selectedCam } = location.state || {};
    const interviewId = "683a97e79caeb7463df2fdf3";

    const { stream } = useMediaStream(selectedMic, selectedCam);

    const [recording, setRecording] = useState(false);
    const [isTTSPlaying, setIsTTSPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0)
    const timerRef = useRef(null);

    // useMediaRecorder 훅에서 start, stop 함수 받음
    const { start, stop } = useMediaRecorder(stream, (blob) => {
        sendAudio(blob);
        uploadVideo(blob, interviewId, questionID);
    });

    const handleButtonClick = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setTimeLeft(0);  // UI 타이머도 리셋
        }
        if (recording) {
            setRecording(false);
            stop();
        } else {
            setRecording(true);
            start();
        }
    };

    // playTTS를 useCallback으로 만들고, start 함수를 의존성으로 넣음
    const playTTS = useCallback((text) => {
        console.log("tts 실행", text);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.onstart = () => {
            setIsTTSPlaying(true)
        }
        utterance.onend = () => {
            setIsTTSPlaying(false);
            console.log("TTS 완료");

            setTimeLeft(10);
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                        console.log("타이머 끝");

                        if (!recording) handleButtonClick();  // 이미 수동 시작했으면 중복 호출 안 됨
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        };

        speechSynthesis.speak(utterance);
    }, [start, recording]);

    // useInterviewWebSocket 훅 호출할 때 onReceiveQuestion을 useCallback으로 묶고 playTTS를 의존성으로 넣음
    const { sendAudio, isConnected, questionID, question, totalQuestions, questionIndex, readyForChainQuestion } = useInterviewWebSocket({
        interviewId,
        onReceiveQuestion: useCallback((text) => {
            playTTS(text);
        }, [playTTS]),
        onComplete: useCallback(() => {
            alert('면접이 완료되었습니다.');
            window.location.replace(PATH.HOME);
        }, [])
    });

    const { uploadVideo, isUploading } = useVideoUpload();



    if (!isConnected) {
        return <LoadingScreen message="면접 준비 중입니다" />;
    }

    return (
        <Container maxWidth={false} style={{
            backgroundColor: "var(--background-color)",
            minHeight: "100vh",
            padding: "0",
            overflow: "hidden",
            display: "flex"
        }}>
            <div className='side-margin'></div>
            <div className='interview-container'>
                <div className='loading' style={{ display: (isTTSPlaying || recording) ? "none" : "flex" }}>
                    <h4 className='title-24-bold' style={{ color: "var(--background-color)", marginTop: "100px", textAlign: "center" }}>
                        00:{timeLeft===10?timeLeft:`0${timeLeft}`}
                    </h4>
                    <h4 className='subtitle-20-medium' style={{ color: "var(--background-color)", marginTop: "0px", textAlign: "center" }}>
                        답변 준비시간이에요.
                    </h4>
                </div>
                <div className='loading' style={{ display: readyForChainQuestion ? "flex" : "none" }}>
                    <h4 className='title-24-bold' style={{ color: "var(--background-color)", marginTop: "100px", textAlign: "center" }}>
                        AI 면접관이 꼬리질문을<br />출제하고 있어요
                    </h4>
                    <LinearProgress sx={{
                        width: "400px",
                        borderRadius: "16px",
                        '& .MuiLinearProgress-bar1Determinate': {
                            backgroundColor: 'var(--primary-60)',
                        }
                    }} />
                </div>
                <div className='loading' style={{ display: isUploading ? "flex" : "none" }}>
                    <h4 className='title-24-bold' style={{ color: "var(--background-color)", marginTop: "100px", textAlign: "center" }}>
                        비디오를<br />보내고 있어요
                    </h4>
                    <LinearProgress sx={{
                        width: "400px",
                        borderRadius: "16px",
                        '& .MuiLinearProgress-bar1Determinate': {
                            backgroundColor: 'var(--primary-60)',
                        }
                    }} />
                </div>
                <video key={recording ? "stand" : "idle"} autoPlay muted loop playsInline className="bg-video">
                    <source src={recording?"/videos/interviewer_stand.mp4":"/videos/interviewer.mp4"} type="video/mp4" />
                    브라우저가 동영상을 지원하지 않습니다.
                </video>
                <Chip className="recording" label="녹화 중" sx={{ backgroundColor: "var(--error-20)", display: recording ? "flex" : "none" }} />
                <div className='contents-container' style={{ boxShadow: recording ? "0 0 0 2px var(--error-60) inset" : "none" }}>
                    <div className='text-container'>
                        <Chip className="progress" label={`${questionIndex}/${totalQuestions}`} sx={{ backgroundColor: "var(--background-color)" }} />
                        <div className='question-container subtitle-20-bold'>
                            Q. {question}
                        </div>
                        <Button
                            onClick={handleButtonClick}
                            
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
