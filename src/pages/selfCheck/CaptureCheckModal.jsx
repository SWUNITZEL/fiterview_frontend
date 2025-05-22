import React, {useState} from 'react';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingModal from '../../components/LoadingModal';
import './SelfCheck.css';

const CaptureModal = ({ capturedImage, open, onClose }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedMic, selectedCam } = location.state || {}

  const imgUploadAndGetInterviewIdURL = `${process.env.REACT_APP_API_URL}interview/waiting-room`

  const onConfirm = async () => {
    if (!capturedImage) return;

    try {
      setLoading(true);

      // base64 → Blob 변환
      const blob = await (await fetch(capturedImage)).blob();
      const formData = new FormData();
      formData.append('image', blob, 'capture.png');

      // POST 요청 및 인터뷰 ID 응답 받기
      const response = await axios.post(imgUploadAndGetInterviewIdURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { interviewId } = response.data; // ✅ 백엔드에서 { interviewId: '...' } 형태로 응답한다고 가정

      if (!interviewId) {
        throw new Error('interviewId가 응답에 없습니다.');
      }

      // 완료되면 다음 화면으로 이동
      navigate('/interview', {
        state: {
          interviewId,
          selectedMic,
          selectedCam,
        },
      });

    } catch (error) {
      console.error('이미지 전송 실패:', error);
      alert('이미지 전송 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };


  if (!open) return null;

  else return (
    <div className="container child-column-center" style={{backgroundColor:"var(--background-color)"}}>
          {loading && <LoadingModal open={true} message="이미지를 전송 중입니다..." />}
          <h1 className="title-24-bold" style={{ margin: '0', padding: '0' }}>
            촬영이 완료되었어요
          </h1>
          <h4 className="subtitle-18-semibold" style={{ marginTop: '8px', marginBottom: '36px', padding: '0', color: 'var(--nuetral-60)' }}>
            사진을 확인해주세요.
          </h4>
          <div>
            <img  style={{ width: '600px', borderRadius: '16px' }} src={capturedImage} alt="Captured" />
          </div>
          <div className='child-row-center' style={{gap:"24px"}}>
            <Button
                      onClick={onClose}
                      size="large"
                      variant="outlined"
                      sx={{
                        width:"150px",
                        borderRadius: '8px',
                        padding: '8px 16px',
                        marginTop: '20px',
                        borderColor: 'var(--nuetral-60)',
                        backgroundColor: 'var(--background-color)',
                        color: 'var(--font-color)'
                      }}
                    >
                다시 찍기
            </Button>
            <Button
                      onClick={onConfirm}
                      className="complete-btn"
                      size="large"
                      sx={{ borderRadius: '8px', padding: '8px 16px', marginTop: '20px',  backgroundColor: 'var(--primary-60)', color: 'var(--background-color)' }}
                    >
                다음으로
            </Button>
          </div>
    </div>
  );
};

export default CaptureModal;