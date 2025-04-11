import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from "./CustomButton"
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { FaCartShopping } from "react-icons/fa6"; // Cart icon

const Navbar = ({scrollY, bgColor, textColor, isBoxShadow}) => {
  const navigate = useNavigate(); 
  const [headerColor, setHeaderColor] = useState(bgColor); // 헤더 초기 색상
  const [color, setColor] = useState(textColor); // 글 색 초기 색상
  const [boxShadow, setBoxShadow] = useState(isBoxShadow); // 초기 색상



  // 스크롤 위치에 따라 색상 변경
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > scrollY) {
          setHeaderColor("var(--background-color)");
          setColor("var(--text-color)");
          setBoxShadow("none");
        } else {
          setHeaderColor("transparent");
          setColor("var(--text-color)");
          setBoxShadow("none");
        }
      };
    
      window.addEventListener("scroll", handleScroll); // ← 이거 빠졌음!
    
      return () => {
        window.removeEventListener("scroll", handleScroll); // 클린업도 필요
      };
    }, []);

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: headerColor, // 스크롤에 따라 배경색 변경
        color:textColor,
        boxShadow: boxShadow,
        backdropFilter: "blur(10px)",
        transition: "background-color 0.3s ease-out", // 색상 변경에 부드러운 전환 효과
        paddingLeft: "3rem",
        paddingRight: "3rem"
      }}
    >
      <Toolbar style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
  <div style={{
    width: '100%',
    maxWidth: '700px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    {/* 왼쪽: 홈 아이콘 */}
    <IconButton color="inherit" style={{ padding: "8px", margin: "0px" }} onClick={() => { navigate("/home") }}>
      <FaCartShopping size="1.2rem" />
    </IconButton>

    {/* 오른쪽: 버튼들 */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button color="inherit">
        <span>모의 면접</span>
      </Button>
      <Button color="inherit">
        <span>내 히스토리</span>
      </Button>
      <CustomButton 
      variant="outlined" 
      fontSize="16px"
      hoverBgColor="var(--tertiary-color)"
      bgColor="var(--primary-light)"
      onClick={() => { navigate("/login") }}>
        <span style={{fontWeight: "400",color:"var(--background-color)"}}>로그인</span>
      </CustomButton>
    </div>
  </div>
</Toolbar>

    </AppBar>
  );
};

export default Navbar;
