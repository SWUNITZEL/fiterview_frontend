import { useState, useEffect, useRef } from 'react';
import { Container } from "@mui/material";
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
  const [activeSection, setActiveSection] = useState(-1);
  const FRONT_AI_MOCK_URL = PATH.AI_MOCK
  const navigate = useNavigateWithScrollTop()
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
      <Footer/>
    </Container>
  );
}

export default Home;
