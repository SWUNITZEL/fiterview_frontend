import { LinearProgress } from '@mui/material';

/**
 * @component LoadingScreen
 * @author 이찬우
 * 
 * 페이지 로딩 중 표시되는 오버레이 로딩 화면 컴포넌트입니다.
 * MUI CircularProgress를 사용해 스피너를 표시하며, 전체 화면을 덮는 반투명 배경과 안내 문구를 포함합니다.
 *
 * @example
 * {loading && <LoadingScreen message="면접 준비 중입니다" />}
 */

const LoadingScreen = ({ message }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--background-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  };

  return (
    <div style={overlayStyle} className='full-screen overflow-hidden'>
      <h4 className='title-24-medium' style={{marginBottom:"100px", marginTop:"0px", padding:"0px"}}>{message}...</h4>
      <LinearProgress sx={{ width: "400px", borderRadius: "16px", '& .MuiLinearProgress-bar1Determinate': { backgroundColor: 'var(--primary-60)' } }} />
    </div>
  );
};

export default LoadingScreen;
