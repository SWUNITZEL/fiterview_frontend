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
import LoadingScreen from '../../components/LoadingScreen';
import PreUploadBanner from "./PreUploadBanner";
import PreUploadContents from "./PreUploadContents";
import PostUploadBanner from "./PostUploadBanner";
import PostUploadContents from "./PostUploadContents";

const AIMock = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const sessionId = getCookie('session_id');
      
      if (sessionId) {

      }
      else {
        setIsUpload(false)
      }

      setLoading(false);
    }, [isUpload]);

  if (loading) return <LoadingScreen />;

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
