import { useState, useEffect, useRef } from 'react';
import { Container } from "@mui/material";
import NavbarComponent from '../../components/Navbar';
import "./Home.css";
import MainBanner from "./MainBanner";
import Section00 from "./Section00";
import Section01 from "./Section01";
import Section02 from "./Section02";
import Section03 from "./Section03";
import Section04 from "./Section04";
import { PATH } from "../../data/paths";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [activeSection, setActiveSection] = useState(-1);
  const FRONT_AI_MOCK_URL = PATH.AI_MOCK
  const navigate = useNavigate()
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
    const handleScroll = () => {
    const scrollPos = window.scrollY + window.innerHeight*0.5;
    let found = -1;

    for (let i = 0; i < sectionRefs.length; i++) {
      const el = sectionRefs[i].current;
      if (!el) continue;

      const offsetTop = el.offsetTop;
      const offsetHeight = el.offsetHeight;
      const nextSection = sectionRefs[i + 1]?.current;
      const nextOffsetTop = nextSection ? nextSection.offsetTop : 0;

      // 2번 섹션만 특별히 임계값 80%로 설정
      let threshold = offsetTop + offsetHeight*0.8;


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
  }, [activeSection]);

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
      <div
        ref={sectionRefs[0]}
        className={`section ${activeSection === 0 ? 'visible' : ''}`}
      >
        <MainBanner onNavigate={handleNavigate} />
      </div>
      <div
        ref={sectionRefs[1]}
        className={`section ${activeSection === 1 ? 'visible' : ''}`}
      >
        <Section00 />
      </div>
      <div
        ref={sectionRefs[2]}
        className={`section ${activeSection === 2 ? 'visible' : ''}`}
      >
        <Section01 />
      </div>
      <div
        ref={sectionRefs[3]}
        className={`section ${activeSection === 3 ? 'visible' : ''}`}
      >
        <Section02 />
      </div>
      <div
        ref={sectionRefs[4]}
        className={`section ${activeSection === 4 ? 'visible' : ''}`}
      >
        <Section03 />
      </div>
      <div
        ref={sectionRefs[5]}
        className={`section ${activeSection === 5 ? 'visible' : ''}`}
      >
        <Section04 onNavigate={handleNavigate} />
      </div>
      <Container
          maxWidth={false}
          style={{
            position:"relative",
            width: "100%",
            backgroundColor: "var(--nuetral-20)",
            height: "312px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding:"70px 240px",
            color:"var(--nuetral-60)"
          }}
        >
        <img style={{ height:"27px"}} src="/images/default/logo_mono.png" alt="Logo"/>
        <p>Copyright ⓒ 2025 Fiterview All right reserved | GITHUB: https://github.com/SWUNITZEL</p>
        <p style={{position: "absolute", bottom: "70px", margin:"0px"}}>서울여자대학교 | 소프트웨어융합학과 | 이찬우 김하은 서영은 염정 임효진 </p>
      </Container>
    </Container>
  );
}

export default Home;
