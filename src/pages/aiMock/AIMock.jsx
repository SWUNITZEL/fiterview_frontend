/**
 * @file AIMock.jsx
 * @description AI 모의면접 페이지
 * @author 이찬우
 * @created 2025-05-07
**/

import React, { useEffect, useState } from "react";
import "./AIMock.css";
import { Container } from "@mui/material";
import { getCookie } from '../../utils/cookies'; 
import NavbarComponent from '../../components/Navbar'
import PreUploadBanner from "./PreUploadBanner";
import PreUploadContents from "./PreUploadContents";
import PostUploadBanner from "./PostUploadBanner";
import PostUploadContents from "./PostUploadContents";

const AIMock = () => {
  const [isUpload, setIsUpload] = useState(false);

  // const userName = "하은"
  // const averageDataByCategory = {
  //   "국어":     [1, 3, 3, 2, 1, null],
  //   "수학":     [3, 3, 2, 1, 1, null],
  //   "영어":     [1, 3, 3, 2, 1, null],
  //   "사회":     [1, 3, 3, 2, 1, null],
  //   "과학":     [3, 3, 2, 1, 1, null],
  //   "한국사":   [1, 1, 2, 2, 1, null],
  //   "기술·가정/제2외국어/한문/교양": [1, 1, 1, 1, 1, null],
  // };

  useEffect(() => {
      const sessionId = getCookie('session_id');
      if (sessionId) {

      }
      else {
        setIsUpload(false)
      }
    }, [isUpload]);

  return (
    <Container maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0 0",
        overflow: "hidden"
      }}>
      <NavbarComponent />

      {isUpload? <PostUploadBanner/>:<PreUploadBanner />}
      {isUpload? <PostUploadContents />:<PreUploadContents />}
      {/* <PostUploadBanner /> */}
      {/* <PostUploadContents userName={userName} averageDataByCategory={averageDataByCategory} /> */}
    </Container>
  );
};

export default AIMock;
