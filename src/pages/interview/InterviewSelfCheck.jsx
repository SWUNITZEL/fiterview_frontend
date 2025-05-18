import React, { useEffect, useRef, useState } from 'react';
import './Interview.css';
import NavbarComponent from '../../components/Navbar';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const InterviewSelfCheck = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [micPermission, setMicPermission] = useState(false);
  const [camPermission, setCamPermission] = useState(false);
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedMic, setSelectedMic] = useState('');
  const [selectedCam, setSelectedCam] = useState('');
  const [stream, setStream] = useState(null);

  // ✅ 장치 목록 + 초기 권한 요청
  useEffect(() => {
    const init = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setStream(mediaStream);
        setMicPermission(true);
        setCamPermission(true);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;

        const devices = await navigator.mediaDevices.enumerateDevices();
        const audio = devices.filter((d) => d.kind === 'audioinput');
        const video = devices.filter((d) => d.kind === 'videoinput');
        setAudioDevices(audio);
        setVideoDevices(video);
        if (audio.length > 0) setSelectedMic(audio[0].deviceId);
        if (video.length > 0) setSelectedCam(video[0].deviceId);
      } catch (err) {
        console.warn('초기 권한 요청 실패:', err);
      }
    };
    init();
  }, []);

  // ✅ 장치 선택 변경 시 새 stream 요청
  useEffect(() => {
    const updateStream = async () => {
      if (!selectedMic && !selectedCam) return;
      try {
        const constraints = {
          audio: selectedMic ? { deviceId: { exact: selectedMic } } : true,
          video: selectedCam ? { deviceId: { exact: selectedCam } } : true,
        };
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(mediaStream);
        setMicPermission(true);
        setCamPermission(true);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch (err) {
        console.error('장치 선택 후 권한 실패:', err);
        setMicPermission(false);
        setCamPermission(false);
        alert('선택된 장치 권한을 허용해주세요.');
      }
    };
    updateStream();
  }, [selectedMic, selectedCam]);

  // ✅ canvas에 video 그리기 (metadata 로딩 후)
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
    video.play().catch(err => console.warn('Video play error:', err));

    return () => {
      video.removeEventListener('loadedmetadata', startDrawing);
      cancelAnimationFrame(animationId);
    };
  }, [stream]);

  // ✅ 권한 재요청 버튼
  const requestPermissions = async () => {
    try {
      const constraints = {
        audio: selectedMic ? { deviceId: { exact: selectedMic } } : true,
        video: selectedCam ? { deviceId: { exact: selectedCam } } : true,
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setMicPermission(true);
      setCamPermission(true);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      alert('마이크 및 카메라 권한을 허용해주세요.');
    }
  };

  const canProceed = micPermission && camPermission;

  return (
    <div className="full-screen overflow-hidden center-screen">
      <NavbarComponent />
      <div className="side-margin"></div>
      <div className="container">
        <div className="left-panel">
          {!stream ? (
            <div className="permission-box">
              <p className="title-32-bold" style={{ color: 'var(--background-color)' }}>
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
            </>
          )}
        </div>

        <div className="right-panel">
          <h2 className="title-32-bold" style={{ textAlign: 'center', paddingBottom: '0', marginBottom: '0' }}>
            면접 참여
          </h2>
          <p className="subtitle-18-medium" style={{ textAlign: 'center', padding: '0', margin: '0' }}>
            카메라와 마이크 사용 권한을 확인해주세요!
          </p>

          <div className="select-box">
            <label>🎙 마이크 선택</label>
            <select value={selectedMic} onChange={(e) => setSelectedMic(e.target.value)}>
              <option value="">선택하세요</option>
              {audioDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || '이름 없는 마이크'}
                </option>
              ))}
            </select>

            <label>📷 카메라 선택</label>
            <select value={selectedCam} onChange={(e) => setSelectedCam(e.target.value)}>
              <option value="">선택하세요</option>
              {videoDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || '이름 없는 카메라'}
                </option>
              ))}
            </select>
          </div>

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

          <button className="complete-btn" disabled={!canProceed}>
            완료
          </button>
        </div>
      </div>
      <div className="side-margin"></div>
    </div>
  );
};

export default InterviewSelfCheck;
