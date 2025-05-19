
/**
 * @module useMediaSetup
 * @description SelfCheck 전용: 권한 요청, 디바이스 목록 조회, stream 생성/바인딩
 * @author 이찬우
 */
import { useEffect, useState } from 'react';

const useMediaSetup = () => {
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [micPermission, setMicPermission] = useState(false);
  const [camPermission, setCamPermission] = useState(false);

  useEffect(() => {
    const getDevicesAndPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMicPermission(true);
        setCamPermission(true);
        const devices = await navigator.mediaDevices.enumerateDevices();
        setAudioDevices(devices.filter((d) => d.kind === 'audioinput'));
        setVideoDevices(devices.filter((d) => d.kind === 'videoinput'));
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error('권한 요청 실패', err);
        setMicPermission(false);
        setCamPermission(false);
      }
    };

    getDevicesAndPermissions();
  }, []);

  return {
    audioDevices,
    videoDevices,
    micPermission,
    camPermission,
  };
};

export default useMediaSetup;
