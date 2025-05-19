import React from 'react';

const LoadingModal = () => {
  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backdropFilter: 'blur(10px)',
    background: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    padding: '40px 60px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  const spinnerStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid var(--primary-60, #5A8DEE)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
  };

  // keyframes를 인라인 스타일로는 못 넣으니, <style> 태그로 동적 삽입
  return (
    <>
      <div style={backdropStyle}>
        <div style={cardStyle} class="drop-shadow-large">
          <div style={spinnerStyle} className="spinner" />
          <p className='subtitle-18-regular'>로딩 중입니다...</p>
        </div>
      </div>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .spinner {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
    </>
  );
};

export default LoadingModal;
