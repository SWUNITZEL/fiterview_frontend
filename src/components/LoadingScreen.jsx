/**
 * @component LoadingScreen
 * @author 이찬우
 * 
 * 페이지 로딩 중 표시되는 오버레이 로딩 화면 컴포넌트입니다.
 * 전체 화면을 덮는 반투명 배경과 회전하는 로딩 스피너, 안내 문구를 포함합니다.
 * CSS는 컴포넌트 내부에 인라인 스타일과 style 태그로 함께 정의되어 있습니다.
 *
 * @example
 * // 로딩 상태일 때 조건부 렌더링
 * {loading && <LoadingScreen />}
 */

import React from 'react';
import NavbarComponent from './Navbar';

const LoadingScreen = () => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  };

  const spinnerStyle = {
    border: '8px solid var(--background-color)',
    borderTop: '8px solid var(--primary-60)',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
  };


  return (
    <>
      <div style={overlayStyle} className='full-screen overflow-hidden'>
        <NavbarComponent />
        <div style={spinnerStyle}></div>
        <p className='subtitle-18-medium'>페이지를 불러오는 중입니다...</p>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default LoadingScreen;
