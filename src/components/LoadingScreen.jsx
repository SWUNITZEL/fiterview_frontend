import { LinearProgress } from '@mui/material';
import MainContainer from './MainContainer';
import {
  Container
} from "@mui/material";

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
  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        height: "100vh",
        padding: "0",
        overflow: "hidden"
      }}
    >
      <LinearProgress 
      sx={{ 
        mt: "68px", 
        height: "5px", 
        width: "100%", 
        borderRadius: "10px", 
        backgroundColor: 'var(--color-blue-050)', 
        '& .MuiLinearProgress-bar': { 
          backgroundColor: 'var(--color-blue-200)', 
          borderRadius: "10px", 
          } 
          }} />
      <MainContainer>
        <h4 className='title-24-medium' style={{marginBottom:"100px", marginTop:"100px", padding:"0px"}}>{message}...</h4>
      </MainContainer>
    </Container>
  );
};

export default LoadingScreen;
