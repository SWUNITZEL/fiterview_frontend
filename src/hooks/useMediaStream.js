/**
 * @module useMediaStream
 * @description SelfCheck + FaceCheck에서 모두 사용, 선택된 디바이스 기반으로 stream을 생성하고, videoRef에 바인딩
 * @author 이찬우
 */
import { useEffect, useRef, useState } from 'react';

const useMediaStream = (selectedMic, selectedCam, externalVideoRef = null) => {
  const internalVideoRef = useRef(null);
  const videoRef = externalVideoRef || internalVideoRef;
  const [stream, setStream] = useState(null);
  const streamRef = useRef(null); // 최신 스트림 참조용

  useEffect(() => {
    const getStream = async () => {
      try {
        const constraints = {
          audio: selectedMic ? { deviceId: { exact: selectedMic } } : true,
          video: selectedCam ? { deviceId: { exact: selectedCam } } : true,
        };
        const newStream = await navigator.mediaDevices.getUserMedia(constraints);

        // 이전 스트림 정리
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }

        streamRef.current = newStream;
        setStream(newStream);

        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } catch (err) {
        console.error('스트림 요청 실패', err);
      }
    };

    getStream();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [selectedMic, selectedCam]);

  return { stream, videoRef };
};

export default useMediaStream;
