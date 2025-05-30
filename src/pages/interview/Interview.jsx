/**
 * @file Interview.jsx
 * @description 모의면접 실행 페이지
 * @author 이찬우
 * @created 2025-03-27
 * @lastModified 2025-04-02
**/

import { useState, } from 'react';
import { useLocation } from 'react-router-dom';
import useMediaStream from '../../hooks/useMediaStream';
import { useInterviewWebSocket } from '../../hooks/useInterviewWebSocket';
import { useMediaRecorder } from '../../hooks/useMediaRecorder';
import { useVideoUpload } from '../../hooks/useVideoUpload';
import { Container, Button, Chip, LinearProgress } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import { PATH } from "../../data/paths"

import "./Interview.css";

function Interview() {
    const location = useLocation();
    const { interviewId, selectedMic, selectedCam } = location.state || {};
    const { stream } = useMediaStream(selectedMic, selectedCam);
    const [recording, setRecording] = useState(false);
    const [question, setQuestion] = useState('');
    const [totalQustions, setTotalQustions] = useState(4);
    const [completedQustions, setCompletedQustions] = useState(1);
    const [readyForChainQuestion, setReadyForChainQuestion] = useState(false);

    const playTTS = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.onend = () => {
            if (text !== "수고하셨습니다.") {
                start();
            }
        };
        speechSynthesis.speak(utterance);
    };


    const { sendAudio, isConnected } = useInterviewWebSocket({
        interviewId: "1",
        onReceiveQuestion: (text) => {
            setQuestion(text);
            playTTS(text);
        },
        onComplete: () => {
            alert('면접이 완료되었습니다.');
            window.location.replace(PATH.HOME);
        }
    });

    const { uploadVideo, isUploading } = useVideoUpload()


    const { start, stop } = useMediaRecorder(stream, (blob) => {
        sendAudio(blob);
        uploadVideo(blob);

    });

    const handleButtonClick = () => {
        if (recording) {
            setRecording(false);
            stop();
        } else {
            setRecording(true);
            start();
        }
    };
    
    // if (!isConnected) {
    // return <LoadingScreen message="면접 준비 중입니다" />;
    // }
    
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
                <video autoPlay muted loop playsInline className="bg-video">
                    <source src="/videos/interviewer.mp4" type="video/mp4" />
                    브라우저가 동영상을 지원하지 않습니다.
                </video>
                <Chip className="recording" label="녹화 중" sx={{ backgroundColor: "var(--error-20)", display: recording ? "flex" : "none" }} />
                <div className='contents-container' style={{ boxShadow: recording ? "0 0 0 2px var(--error-60) inset" : "none" }}>
                    <div className='text-container'>
                        <Chip className="progress" label={`${completedQustions}/${totalQustions}`} sx={{ backgroundColor: "var(--background-color)" }} />
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
