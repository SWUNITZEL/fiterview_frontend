import { useState } from 'react';
import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";

import { useUser } from '../../contexts/UserContext';
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';

import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoadingScreen from '../../components/LoadingScreen';
import Progress from "./Progress";
import ServiceInfo from "./ServiceInfo";
import "./Home.css";

function Home() {
  const { user, loading } = useUser();
  const navigate = useNavigateWithScrollTop();
  const handleNavigate = (path) => {
    navigate(path);
  };

  // 모바일 감지
  const [isMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        window.innerWidth <= 768 ||
        /Mobi|Android/i.test(navigator.userAgent)
      );
    }
    return false;
  });

  // 모바일이면 처음부터 메인 콘텐츠 차단 + 모달만 표시
  if (isMobile) {
    return (
      <Dialog open={true} aria-labelledby="mobile-warning-title">
        <DialogTitle id="mobile-warning-title">PC 접속 권장</DialogTitle>
        <DialogContent>
          이 서비스는 모바일 환경에서는 이용할 수 없습니다.
          <br />
          더 나은 경험을 위해 <b>PC로 접속</b>해주세요.
        </DialogContent>
      </Dialog>
    );
  }

  if (loading) {
    // 사용자 정보 로딩 중일 때 로딩 화면 표시
    return( 
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        height: "auto",
        padding: "0",
        overflow: "hidden"
      }}
    >
      <NavbarComponent />
      <LoadingScreen message="" />
    </Container>
    )
  }

  // PC일 경우 정상 콘텐츠 렌더링
  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        height: "auto",
        padding: "0",
        overflow: "hidden"
      }}
    >
      <NavbarComponent />

      {
        user ?
          <Progress user={user} onNavigate={handleNavigate} />:
          <ServiceInfo onNavigate={handleNavigate} />
      }

      <Footer />
    </Container>
  );
}

export default Home;
