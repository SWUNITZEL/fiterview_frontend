import React from 'react';
import { Button, Container } from '@mui/material';
import LoadingModal from '../../components/LoadingModal';
import { useCaptureConfirm } from '../../hooks/useCaptureConfirm';
import './SelfCheck.css';

const CaptureModal = ({ capturedImage, open, onClose, onError, combineId }) => {
  const { loading, onConfirm } = useCaptureConfirm({ capturedImage, combineId, onError });

  if (!open) return null;

  return (
    <Container maxWidth={false} style={{
            backgroundColor: "var(--background-color)",
            padding: "0",
            overflow: "hidden",
            display: "flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
        }}>
      {loading && <LoadingModal open={true} message="이미지를 전송 중입니다..." />}
      <h1 className="title-24-bold" style={{ margin: 0, padding: 0 }}>
        촬영이 완료되었어요
      </h1>
      <h4 className="subtitle-18-semibold" style={{ marginTop: 8, marginBottom: 36, padding: 0, color: "var(--nuetral-60)" }}>
        사진을 확인해주세요.
      </h4>
      <div>
        <img style={{ width: 600, borderRadius: 16 }} src={capturedImage} alt="Captured" />
      </div>
      <div className="child-row-center" style={{ height:"fit-contents", gap: 24 }}>
        <Button
          onClick={onClose}
          size="large"
          variant="outlined"
          sx={{
            width: 150,
            borderRadius: 8,
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
          sx={{
            borderRadius: 8,
            padding: '8px 16px',
            marginTop: '20px',
            backgroundColor: 'var(--primary-60)',
            color: 'var(--background-color)'
          }}
        >
          다음으로
        </Button>
      </div>
    </Container>
  );
};

export default CaptureModal;
