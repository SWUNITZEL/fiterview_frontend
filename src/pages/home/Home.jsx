import { useState, useEffect, useRef } from 'react';
import { Container } from "@mui/material";
import NavbarComponent from '../../components/Navbar';
import "./Home.css";
import MainBanner from "./MainBanner";
import SectionIntro from "./SectionIntro";
import SectionFeature01 from "./SectionFeature01";
import SectionFeature02 from "./SectionFeature02";

function Home() {
  const [activeSection, setActiveSection] = useState(0);
  
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2; // 화면 중간 기준
      let found = 0;

      sectionRefs.forEach((ref, index) => {
        const el = ref.current;
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            found = index;
          }
        }
      });

      setActiveSection(found);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0",
        overflow: "hidden"
      }}
    >
      <NavbarComponent />
      <div
        ref={sectionRefs[0]}
        className={`section ${activeSection === 0 ? 'visible' : 'hidden'}`}
      >
        <MainBanner />
      </div>
      <div
        ref={sectionRefs[1]}
        className={`section ${activeSection === 1 ? 'visible' : 'hidden'}`}
      >
        <SectionIntro />
      </div>
      <div
        ref={sectionRefs[2]}
        className={`section ${activeSection === 2 ? 'visible' : 'hidden'}`}
      >
        <SectionFeature01 />
      </div>
      <SectionFeature02 />
    </Container>
  );
}

export default Home;
