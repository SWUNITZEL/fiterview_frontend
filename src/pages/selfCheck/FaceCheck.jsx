import { useEffect, useRef, useState } from 'react';
import './SelfCheck.css';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import CaptureModal from './CaptureCheckModal';
import useMediaStream from '../../hooks/useMediaStream';

const FaceCheck = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [searchParams] = useSearchParams();
  const combineId = searchParams.get('combineId');

  const location = useLocation();
  const { selectedMic, selectedCam } = location.state || {};

  const [modalOpen, setModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const { stream } = useMediaStream(selectedMic, selectedCam, videoRef);


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

  const handleCapture = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageSrc = canvas.toDataURL('image/png');
      setCapturedImage(imageSrc);
      setModalOpen(true);
    }
  };

  const canProceed = !!selectedMic && !!selectedCam && !!stream;

  return (
    <div className="full-screen center-both overflow-hidden">
      <div className="side-margin"></div>
      <CaptureModal
          capturedImage={capturedImage}
          combineId={combineId}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      <div className="container child-column-center" style={{display:modalOpen?"none":"flex"}}>
        <h1 className="title-24-bold" style={{ margin: '0', padding: '0' }}>
          정면의 카메라를 보고 무표정으로 촬영해주세요
        </h1>
        <h4 className="subtitle-18-semibold" style={{ marginTop: '8px', marginBottom: '36px', padding: '0', color: 'var(--nuetral-60)' }}>
          표정 분석에 사용돼요.
        </h4>
        <div>
          <canvas ref={canvasRef} style={{ width: '600px', height: 'auto', borderRadius: '16px' }} />
          <video ref={videoRef} style={{ display: 'none' }} autoPlay muted playsInline />
        </div>
        <Button
          onClick={handleCapture}
          disabled={!canProceed}
          className="complete-btn"
          size="large"
          combineId={combineId}
          sx={{ borderRadius: '8px', padding: '8px 16px', marginTop: '20px' }}
        >
          촬영하기
        </Button>
      </div>
      <div className="side-margin"></div>
    </div>
  );
};

export default FaceCheck;
