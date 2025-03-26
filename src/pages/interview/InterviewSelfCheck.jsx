import React, { useRef, useState, useCallback, useEffect } from 'react';
import './InterviewSelfCheck.css';
import CaptureModal from './CaptureModal.jsx'
//
import { TbCameraCheck, TbMoodCheck, TbArrowNarrowLeft, TbArrowNarrowRight, TbCheckbox  } from "react-icons/tb";


const WebcamCapture = () => {
  const BackCaptureURL = "" // 백엔드 엔드포인트 
  const FrontLoadingURL = "" // 백엔드 엔드포인트 
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    let stream;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => console.error('Error accessing webcam:', error));
  
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop()); // 스트림 정리
      }
    };
  }, []);
  

  const startCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/webp');
    console.log(image)
    setCapturedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCapturedImage(null);
  };

  const sendImg = async () => {
    try{
      const response = await fetch(BackCaptureURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: capturedImage,
        }),
        })

        const data = await response.json();
        console.log('Response:', data)
        window.location.replace(FrontLoadingURL);
      }catch(e){
        console.log('send error')
      }

  }

  return (
    <div className='webcam-container'>
      {/* 웹캠 비디오 요소 */}
      <video ref={videoRef} autoPlay playsInline className='webcam' />
      {showModal && (
        <CaptureModal 
          capturedImage={capturedImage} 
          onClose={closeModal} 
          onConfirm={sendImg} 
        />
      )}

      <div className='checklist'>

        
        <div className='head'>
          <div className='cam'><TbCameraCheck /></div>
          <h1>면접이 곧 시작돼요</h1>
          <p>준비가 다 됐다면</p>
          <p>정면 사진을 찍어주세요!</p>
        </div>
        <br></br>

        <ul>
          <li>
            <span className='ion-icon'><TbCheckbox  /></span> &nbsp; <span>카메라를 켜 주세요!</span>
          </li>
          <li>
            <span className='ion-icon'><TbCheckbox  /></span> &nbsp; <span>마이크를 켜 주세요!</span>
          </li>
          <li>
            <span className='ion-icon'><TbCheckbox  /></span> &nbsp; <span>스피커를 켜 주세요!</span>
          </li>
          <li>
            <span className='ion-icon'><TbCheckbox  /></span> &nbsp; <span>앞머리는 걷어 주세요!</span>
          </li>
          <li>
            <span className='ion-icon'><TbCheckbox  /></span> &nbsp; <span>소음이 없는지 확인해 주세요!</span>
          </li>
        </ul>
        <div className='button-place'>
          <button onClick={startCapture} className='gradientButton'><b>사진 찍기</b></button>
        </div>

        {/* 캡처된 이미지를 그릴 캔버스 */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );};

export default WebcamCapture;
