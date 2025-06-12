// InterviewSessionWrapper.jsx
import {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import SelfCheck from "../selfCheck/SelfCheck";
import FaceCheck from "../selfCheck/FaceCheck";
import SoundCheck from "../selfCheck/SoundCheck";
import Interview from "./Interview";
import useMediaStream from "../../hooks/useMediaStream";
import { PATH } from '../../data/paths';


const InterviewSessionWrapper = () => {
  const [selectedMic, setSelectedMic] = useState(null);
  const [selectedCam, setSelectedCam] = useState(null);
  const { stream, videoRef } = useMediaStream(selectedMic, selectedCam);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <Routes>
      <Route path={PATH.INTERVIEW_SELF_CHECK_REL} element={
        <SelfCheck
          setSelectedMic={setSelectedMic}
          selectedMic={selectedMic}
          setSelectedCam={setSelectedCam}
          selectedCam={selectedCam}
          stream={stream}
          videoRef={videoRef}
        />
      } />
      <Route path={PATH.INTERVIEW_SELF_CHECK_FACE_REL} element={
        <FaceCheck
          stream={stream}
          videoRef={videoRef}
        />
      } />
      <Route path={PATH.INTERVIEW_SELF_CHECK_SOUND_REL} element={
        <SoundCheck
          stream={stream}
          videoRef={videoRef}
        />
      } />
      <Route path={PATH.INTERVIEW_REL} element={
        <Interview stream={stream} videoRef={videoRef} />
      } />
    </Routes>
  );
};

export default InterviewSessionWrapper;
