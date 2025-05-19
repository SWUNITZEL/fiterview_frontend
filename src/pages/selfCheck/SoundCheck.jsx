import React, { useEffect, useRef, useState } from 'react';
import './SelfCheck.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import useMediaStream from '../../hooks/useMediaStream';
import CustomAudioPlayer from '../../components/CustomAudioPlayer';

const SoundCheck = () => {
    const navigate = useNavigate();
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const audioRef = useRef(null); // 녹음된 오디오 재생용
    const mediaRecorderRef = useRef(null); // MediaRecorder 인스턴스
    const chunksRef = useRef([]); // 녹음 데이터 저장

    const location = useLocation();
    const { selectedMic, selectedCam } = location.state || {};

    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioURL, setRecordedAudioURL] = useState(null);

    const { stream } = useMediaStream(selectedMic, selectedCam, videoRef);

    // 비디오 스트리밍 → 캔버스에 그림
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || !stream) return;

        const ctx = canvas.getContext('2d');
        let animationId;

        const startDrawing = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const draw = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            animationId = requestAnimationFrame(draw);
        };
        draw();
        };

        video.addEventListener('loadedmetadata', startDrawing);
        video.play().catch((err) => console.warn('Video play error:', err));

        return () => {
        video.removeEventListener('loadedmetadata', startDrawing);
        cancelAnimationFrame(animationId);
        };
    }, [stream]);

    // 녹음 시작/중지 핸들러
    const handleRecord = () => {
        if (!stream) return;

        if (!isRecording) {
        // 녹음 시작
        const audioStream = new MediaStream(stream.getAudioTracks());
        const mediaRecorder = new MediaRecorder(audioStream);

        chunksRef.current = [];
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
            chunksRef.current.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
            const audioURL = URL.createObjectURL(blob);
            setRecordedAudioURL(audioURL);
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
        } else {
        // 녹음 종료
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
        }
    };

    const canProceed = !!selectedMic && !!selectedCam && !!stream;

    return (
        <div className="full-screen center-both overflow-hidden">
        <div className="side-margin"></div>
        <div className="container child-column-center">
            <h1 className="title-24-bold" style={{ margin: '0', padding: '0' }}>
            다음 문장을 녹음해주세요
            </h1>
            <h4 className="subtitle-18-semibold" style={{ marginTop: '8px', marginBottom: '36px', padding: '0', color: 'var(--nuetral-60)' }}>
            마이크 작동을 테스트 해요.
            </h4>
            <div style={{position:"relative", display: "flex", flexDirection: "column", alignItems:"center", justifyContent:"center"}}>
            <div className="body-16-medium" style={{ position: 'absolute', bottom: '15px', backgroundColor:"var(--nuetral-80)", color:"var(--background-color)", padding:"8px 30px", borderRadius:"40px"}}>
                계절이 지나가는 가을 하늘에는 가을로 가득 차 있습니다.
            </div>
            <canvas ref={canvasRef} style={{ width: '600px', height: 'auto', borderRadius: '16px', border: isRecording?"2px soild var(--primary-60)":"none"}} />
            <video ref={videoRef} style={{ display: 'none' }} autoPlay muted playsInline />
            </div>
            {recordedAudioURL && (
            <div style={{ marginTop: '20px' }}>
                <CustomAudioPlayer src={recordedAudioURL} preload="metadata"  />
            </div>
            )}
            <div className='child-row-center' style={{gap:"24px"}}>
                {recordedAudioURL && (
                <Button
                onClick={() =>
                navigate('/self-check/face-check', {
                    state: {
                    selectedMic,
                    selectedCam,
                    },
                })}
                disabled={!canProceed}
                size="large"
                sx={{ backgroundColor: "var(--primary-60)", color:"var(--background-color)", borderRadius: '8px', padding: '8px 16px', marginTop: '20px', width:"150px",  '&:hover': {
                        backgroundColor: "var(--primary-60)", // hover 시에도 동일하게
                    }}}
                >
                다음으로
                </Button>
                )}
            
                <Button
                onClick={handleRecord}
                disabled={!canProceed}
                variant="outlined"
                size="large"
                sx={{
                        backgroundColor: 'var(--background-color)',
                        borderColor: isRecording? "var(--primary-40)":"var(--nuetral-60)", color:"var(--font-body)", borderRadius: '8px', padding: '8px 16px', marginTop: '20px', width:"150px",  '&:hover': {
                            backgroundColor: "var(--nuetral-20)",
                            borderColor: isRecording ? "var(--primary-40)" : "var(--primary-60)", // hover 시에도 동일하게
                    }}}
                >
                {isRecording ? '완료' : '녹음 시작'}
                </Button>
            </div>
        </div>
        <div className="side-margin"></div>
        </div>
    );
};

export default SoundCheck;
