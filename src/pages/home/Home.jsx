import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import "./Home.css";
import MainBanner from "./MainBanner";
import Section00 from "./Section00";
import Section01 from "./Section01";
import Section02 from "./Section02";
import Section03 from "./Section03";
import Section04 from "./Section04";
import { PATH } from "../../data/paths";
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';

function Home() {
  // ✅ 모바일 여부를 처음부터 바로 판별해서 초기값으로 설정
  const [isMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        window.innerWidth <= 768 ||
        /Mobi|Android/i.test(navigator.userAgent)
      );
    }
    return false;
  });

  const [activeSection, setActiveSection] = useState(-1);

  const FRONT_AI_MOCK_URL = PATH.AI_MOCK;
  const navigate = useNavigateWithScrollTop();

  const handleNavigate = () => {
    navigate(FRONT_AI_MOCK_URL);
    window.scrollTo(0, 0);
  };

  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    if (isMobile) return; // 📱 모바일이면 스크롤 이벤트 무시

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.5;
      let found = -1;

      for (let i = 0; i < sectionRefs.length; i++) {
        const el = sectionRefs[i].current;
        if (!el) continue;

        const offsetTop = el.offsetTop;
        const offsetHeight = el.offsetHeight;
        const nextSection = sectionRefs[i + 1]?.current;
        const nextOffsetTop = nextSection ? nextSection.offsetTop : 0;

        let threshold = offsetTop + offsetHeight * 0.8;

        if (scrollPos >= offsetTop && scrollPos < threshold) {
          found = i;
          break;
        } else if (scrollPos >= threshold && nextOffsetTop !== 0) {
          found = i + 1;
        }
      }

      if (found !== activeSection) {
        setActiveSection(found);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, isMobile]);

  // 📌 모바일이면 처음부터 메인 콘텐츠 차단 + 모달만 표시
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

  // 📌 PC일 경우 정상 콘텐츠 렌더링
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

      <div ref={sectionRefs[0]} className={`section ${activeSection === 0 ? 'visible' : ''}`}>
        <MainBanner onNavigate={handleNavigate} />
      </div>

      <div ref={sectionRefs[1]} className={`section ${activeSection === 1 ? 'visible' : ''}`}>
        <Section00 />
      </div>

      <div ref={sectionRefs[2]} className={`section ${activeSection === 2 ? 'visible' : ''}`}>
        <Section01 />
      </div>

      <div ref={sectionRefs[3]} className={`section ${activeSection === 3 ? 'visible' : ''}`}>
        <Section02 />
      </div>

      <div ref={sectionRefs[4]} className={`section ${activeSection === 4 ? 'visible' : ''}`}>
        <Section03 />
      </div>

      <div ref={sectionRefs[5]} className={`section ${activeSection === 5 ? 'visible' : ''}`}>
        <Section04 onNavigate={handleNavigate} />
      </div>

      <Footer />
    </Container>
  );
}

export default Home;
