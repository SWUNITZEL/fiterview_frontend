import React from "react";
import { Box } from "@mui/material";

const Banner = ({ scrollPosition, maxScroll, imgUrl }) => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(20px)', // 배경 블러 효과

        color: "#fbfbfb",
        marginTop: "20px",
        paddingTop: "10%",
        paddingBottom: "10%",
        textAlign: "center",
        transition: "opacity 0.5s ease-out",
        opacity: scrollPosition < maxScroll ? 1 : 0, // 스크롤 위치에 따라 투명도 조절
      }}
    >
    </Box>
  );
};

export default Banner;
