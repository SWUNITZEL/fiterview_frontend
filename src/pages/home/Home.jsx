import React, {useState, useEffect} from 'react';
import { Container } from "@mui/material";
import NavbarComponent from '../../components/Navbar'
import FullBanner from '../../components/FullBanner'

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0); // scroll 위치 구하기(애니메이션 적용을 위함)
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0 0",
      }}>
      <NavbarComponent />
      {/* <FullBanner 
        scrollPosition={scrollPosition}
        maxScroll = {70} 
        imgUrl={'images/home/banner.png'}/> */}
      <h2>Home!</h2>
    </Container>
  );
}

export default Home;