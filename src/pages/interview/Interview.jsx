import { useState, useCallback, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useInterviewWebSocket } from '../../hooks/useInterviewWebSocket';
import { useVideoUpload } from '../../hooks/useVideoUpload';
import { Container, Button, Chip, LinearProgress, Modal, Box, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import { PATH } from "../../data/paths";
import { LASTMENT, STT_ERROR_MESSAGE, VIDEO_UPLOAD_REQ } from "../../data/interview";
import "./Interview.css";

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    bgcolor: 'var(--background-color)',
    borderRadius: "16px",
    boxShadow: 'none',
    p: 4,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',   
    border: 'none', 
    '&:hover': {
      boxShadow: 'none',   
      outline: 'none',    
      border: 'none',      
    },
};

function Interview({stream}) {
  const location = useLocation();
  const { interviewId } = location.state || {};

  const [recording, setRecording] = useState(false);
  const [recordingQuestionId, setRecordingQuestionId] = useState(null);
  const [prevQuestion, setPrevQuestion] = useState(null)
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);
  const [isSTTError, setIsSTTError] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);

  const [pendingQuestion, setPendingQuestion] = useState(null);
  const [pendingTTS, setPendingTTS] = useState(true);

  const timerRef = useRef(null);
  const interviewStartedRef = useRef(interviewStarted);
  const streamRef = useRef(null);
  const questionIDRef = useRef(null);
  const lastRecordedBlobRef = useRef(null);
  const lastRecordedQuestionIdRef = useRef(null);

  const { uploadVideo, isUploading } = useVideoUpload();
  const isUploadingRef = useRef(isUploading);
  
  useEffect(() => {
    isUploadingRef.current = isUploading;
  }, [isUploading]);

  const showLoading = interviewStarted && !isUploadingRef.current && !(isTTSPlaying || recording) & timeLeft === 0;

  useEffect(() => {
    interviewStartedRef.current = interviewStarted;
  }, [interviewStarted]);

  useEffect(() => {
    streamRef.current = stream;
  }, [stream]);

  useEffect(() => {
    if (isInterviewComplete && !isUploading) {
      alert('면접이 완료되었습니다.');
      window.location.replace(`${PATH.REPORT_NOTICE}?interviewId=${interviewId}`);
    }
  }, [isInterviewComplete, isUploading]);

  const handleButtonClickRef = useRef();

  const playTTS = useCallback((text) => {
    const cleanedText = text.replace(/^\s*\d{1,2}[\.\)]\s*/, '');
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'ko-KR';
    utterance.onstart = () => {
      setIsTTSPlaying(true);
      setPendingTTS(false)
      setRecordingQuestionId(questionIDRef.current)
    };
    utterance.onend = () => {
      setIsTTSPlaying(false);
      setTimeLeft(10);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            if (!recording) handleButtonClickRef.current?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };
    speechSynthesis.speak(utterance);
  }, [recording]);

  const { sendAudio, isConnected, questionID, question, totalQuestions, questionIndex, readyForChainQuestion } =
    useInterviewWebSocket({
      interviewId,
      onReceiveQuestion: useCallback((text) => {
          const isFinalComment = text.includes(LASTMENT);
          const isVideoUploadReq = text.includes(VIDEO_UPLOAD_REQ);
          const isSTTErrorMessage = text.includes(STT_ERROR_MESSAGE)

          console.log((!isVideoUploadReq || !interviewStartedRef.current || isUploadingRef.current))
          console.log("console.log(isFinalComment)", isFinalComment)
          console.log("console.log(isVideoUploadReq)", isVideoUploadReq)
          console.log("console.log(isSTTErrorMessage)", isSTTErrorMessage)

          if (!isVideoUploadReq || !interviewStartedRef.current || isUploadingRef.current) {
            if (isSTTErrorMessage){
              setIsSTTError(true)
              
            } else {
              setIsSTTError(false)
              setPrevQuestion(text)
            }
            console.log("console.log(isSTTError)", isSTTError)
            setPendingQuestion(text);
            return;
          }

          else if (isFinalComment) {
            playTTS(text); 
          } 

          else if(!isVideoUploadReq) {
            playTTS(text);
          }

          else if (isVideoUploadReq) {
            console.log("비디오 전송 시도")
            uploadVideo(lastRecordedBlobRef.current, interviewId, lastRecordedQuestionIdRef.current);

            // 전송 후 초기화
            lastRecordedBlobRef.current = null;
            lastRecordedQuestionIdRef.current = null;
          }

          

        }, [isUploadingRef.current, playTTS]),
      onComplete: useCallback(() => {
        setIsInterviewComplete(true)
      }, [])
    });

  questionIDRef.current = questionID;

  const handleStart = useCallback(() => {
    if (!streamRef.current) return;

    const recorder = new MediaRecorder(streamRef.current);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      sendAudio(blob);
      // uploadVideo(blob, interviewId, recordingQuestionId);
      lastRecordedBlobRef.current = blob;
      lastRecordedQuestionIdRef.current = recordingQuestionId;
    };

    recorder.start();
    streamRef.current._recorder = recorder;
  }, [sendAudio, uploadVideo, interviewId, questionIDRef]);

  const stopRecording = () => {
    if (streamRef.current?._recorder) {
      streamRef.current._recorder.stop();
      streamRef.current._recorder = null;
    }
  };

  const handleButtonClick = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTimeLeft(0);
    }

    if (recording) {
      setRecording(false);
      setPendingTTS(true); 
      stopRecording();
    } else {
      setRecording(true);
      setPendingTTS(false); 
      handleStart();
    }
  };

  handleButtonClickRef.current = handleButtonClick;  

  const handleStartInterview = () => {
    setInterviewStarted(true);
  };

  useEffect(() => {
    if (!isUploading && pendingQuestion && interviewStarted) {
      if (pendingQuestion) {
        playTTS(pendingQuestion);
        setPendingQuestion(null);
      }
    }
  }, [interviewStarted, isUploading, pendingQuestion, playTTS]);

  if (!isConnected&&!isInterviewComplete) {
    return <LoadingScreen message="면접을 준비하고 있습니다." />;
  }

  else if (isInterviewComplete) {
    return <LoadingScreen message="페이지를 벗어나지 말고 잠시 대기해주세요" />;
  }

  return (
    <Container maxWidth={false} style={{
      backgroundColor: "var(--background-color)",
      minHeight: "100vh",
      padding: "0",
      overflow: "hidden",
      display: "flex"
    }}>
      <Modal 
        open={!interviewStarted}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
          },
        }
      }>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{marginBottom:"40px", fontWeight:"600"}} gutterBottom>면접을 시작하시겠습니까?</Typography>
            <Button onClick={handleStartInterview} className="complete-btn" size="large" sx={{ borderRadius: '8px', padding: '8px 16px', marginTop: '20px' }}>
                면접 시작하기
            </Button>
        </Box>
      </Modal>

      <div className='side-margin'></div>
      <div className='interview-container'>
        <div className='loading' style={{ display: showLoading? "flex" : "none" }}>
          <h4 className='title-40-bold' style={{ color: "var(--background-color)", marginTop: "100px", textAlign: "center", marginBottom:"10px"}}>
            00:{timeLeft === 10 ? timeLeft : `0${timeLeft}`}
          </h4>
          <h4 className='subtitle-20-medium' style={{ color: "var(--background-color)", marginTop: "0px", textAlign: "center" }}>
            답변 준비시간이에요.
          </h4>
        </div>
        <div className='loading' style={{ display: (!isUploading)&&(readyForChainQuestion)&&(!isSTTError) ? "flex" : "none" }}>
          <h4 className='title-24-bold' style={{ color: "var(--background-color)", marginTop: "100px", textAlign: "center" }}>
            AI 면접관이 꼬리질문을<br />출제하고 있어요
          </h4>
          <LinearProgress sx={{ width: "400px", borderRadius: "16px", '& .MuiLinearProgress-bar1Determinate': { backgroundColor: 'var(--primary-60)' } }} />
        </div>
        <div className='loading' style={{ display: isUploading ? "flex" : "none" }}>
          <h4 className='title-24-bold' style={{ color: "var(--background-color)", marginTop: "100px", textAlign: "center" }}>
            비디오를<br />보내고 있어요
          </h4>
          <LinearProgress sx={{ width: "400px", borderRadius: "16px", '& .MuiLinearProgress-bar1Determinate': { backgroundColor: 'var(--primary-60)' } }} />
        </div>
        <video autoPlay muted loop playsInline className="bg-video">
          <source src={recording ? "/videos/interviewer_stand.mp4" : "/videos/interviewer.mp4"} type="video/mp4" />
          브라우저가 동영상을 지원하지 않습니다.
        </video>
        <Chip className="recording" label="녹화 중" sx={{ backgroundColor: "var(--error-10)", display: recording ? "flex" : "none" }} />
        {/* <div className='contents-container' style={{ boxShadow: recording ? "0 0 0 2px var(--error-60) inset" : "none" }}> */}
        <div className='contents-container' style={{ boxShadow: "none" }}>
          <div className='text-container'>
            <Chip className="progress" label={`${questionIndex}/${totalQuestions}`} sx={{ backgroundColor: "var(--background-color)" }} />
            <Chip style={{display: (isSTTError)?"flex":"none"}} className="warning" label={`음성이 녹음되지 않았습니다. 다시 녹음해주세요`} sx={{ backgroundColor: "var(--background-color)" }} />
            <div className='question-container subtitle-20-bold' style={{paddingLeft:"30px", paddingRight:"30px"}}>
              {(isSTTError ? prevQuestion : question)
                .replace(/^\s*\d{1,2}[\.\)]\s*/, '')
                .split(/([.?!])\s+/) // 문장 단위로 나누기
                .reduce((acc, cur, idx, arr) => {
                  // 마침표나 물음표 뒤에 <br /> 추가
                  if (/[.?!]/.test(cur) && arr[idx + 1] != null) {
                    acc.push(cur + ' ');
                    acc.push(<br key={idx} />);
                  } else if (!/[.?!]/.test(cur)) {
                    acc.push(cur);
                  }
                  return acc;
                }, [])
              }
            </div>
            <Button 
            disabled={
                !interviewStarted || 
                isTTSPlaying || 
                isUploading || 
                pendingTTS ||
                ((!isUploading && readyForChainQuestion) && !isSTTError)
              }
            onClick={handleButtonClick} 
            className={recording ? 'recording-complete-btn' : 'complete-btn'} 
            size="large" 
            sx={{ 
                borderRadius: '8px', 
                padding: '8px 16px', 
                marginTop: '20px', 
                '&.Mui-disabled': {
                backgroundColor: 'var(--nuetral-30)',  
                color: 'var(--nuetral-50)',
                opacity: 0.7,     
                }}}>
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
