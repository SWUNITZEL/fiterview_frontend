import { useEffect, useRef, useState } from 'react';
import './SelfCheck.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '@mui/material';
import useMediaSetup from '../../hooks/useMediaSetup';
import { PATH } from '../../data/paths';

const SelfCheck = ({setSelectedMic, selectedMic, setSelectedCam, selectedCam, stream, videoRef}) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [searchParams] = useSearchParams();
  const combineId = searchParams.get('combineId');

  // 장치 목록 및 권한 확인
  const {
    audioDevices,
    videoDevices,
    micPermission,
    camPermission,
  } = useMediaSetup(setSelectedMic, setSelectedCam);

  useEffect(() => {
    if (audioDevices.length > 0) {
      setSelectedMic((prev) => prev || audioDevices[0].deviceId);
    }
    if (videoDevices.length > 0) {
      setSelectedCam((prev) => prev || videoDevices[0].deviceId);
    }
  }, [audioDevices, videoDevices]);;

  // stream이 바뀔 때 canvas 그리기
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!stream || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
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

  const requestPermissions = async () => {
    alert('브라우저 설정에서 마이크와 카메라 권한을 허용해주세요.');
  };

  const canProceed = micPermission && camPermission && selectedMic && selectedCam;

  return (
    <div className="full-screen overflow-hidden center-both" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="side-margin"></div>
      <div className="container">
        <div className="left-panel">
          {!stream ? (
            <div className="permission-box">
              <p className="title-32-bold" style={{ color: 'var(--background-color)', marginTop: '250px' }}>
                마이크와 카메라를 감지할 수 없어요.
              </p>
              <button className="request-btn" onClick={requestPermissions}>
                마이크 및 카메라 권한 요청
              </button>
            </div>
          ) : (
            <>
              <canvas ref={canvasRef} className="preview-canvas" />
              <video ref={videoRef} style={{ display: 'none' }} autoPlay muted playsInline />
              <div className="select-box">
                <select value={selectedMic} onChange={(e) => setSelectedMic(e.target.value)}>
                  <option value="">마이크 선택</option>
                  {audioDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || '이름 없는 마이크'}
                    </option>
                  ))}
                </select>
                <select value={selectedCam} onChange={(e) => setSelectedCam(e.target.value)}>
                  <option value="">카메라 선택</option>
                  {videoDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || '이름 없는 카메라'}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <div className="right-panel">
          <h2 className="title-32-bold" style={{ textAlign: 'center', paddingBottom: '0', marginBottom: '0' }}>
            면접 참여
          </h2>
          <p className="subtitle-18-medium" style={{ textAlign: 'center', padding: '0', margin: '0' }}>
            카메라와 마이크 사용 권한을<br />확인해주세요!
          </p>

          <div className="checkboxes">
            <label>
              <input type="checkbox" checked={micPermission} readOnly />
              마이크 사용 권한 {micPermission && <CheckCircleIcon className="icon" />}
            </label>
            <label>
              <input type="checkbox" checked={camPermission} readOnly />
              카메라 사용 권한 {camPermission && <CheckCircleIcon className="icon" />}
            </label>
          </div>

          <Button
            onClick={() =>
              navigate(`${PATH.INTERVIEW_SELF_CHECK_SOUND}?combineId=${combineId}`)
            }
            className="complete-btn"
            disabled={!canProceed}
            size="large"
            sx={{ borderRadius: '8px', padding: '8px 16px', marginTop: '200px' }}
          >
            완료
          </Button>
        </div>
      </div>
      <div className="side-margin"></div>
    </div>
  );
};

export default SelfCheck;
