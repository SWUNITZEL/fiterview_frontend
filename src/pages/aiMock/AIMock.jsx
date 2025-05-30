/**
 * @file AIMock.jsx
 * @description AI 모의면접 페이지
 * @author 이찬우
 * @created 2025-05-07
**/

import { useEffect, useState } from "react";
import "./AIMock.css";
import { useUser } from '../../contexts/UserContext';
import NavbarComponent from '../../components/Navbar'
import PreUploadBanner from "./PreUploadBanner";
import PreUploadContents from "./PreUploadContents";
import PostUploadBanner from "./PostUploadBanner";
import PostUploadContents from "./PostUploadContents";

import { Skeleton, Container } from "@mui/material";

const AIMock = () => {
  const [isUpload, setIsUpload] = useState(false);
  const { user, loading } = useUser();

  if (loading) {
    return (
      <Container maxWidth={false}
        style={{
          backgroundColor: "var(--background-color)",
          minHeight: "100vh",
          padding: "0 0",
          overflowX: "hidden",
          display: "flex", 
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center", 
          justifyContent: "center"  
        }}>
          <NavbarComponent />        
          <Skeleton variant="rectangular" width="100%" height={520} />
          <Skeleton variant="text" width="40%" height={40} style={{ marginTop: "100px" }} />
          <Skeleton variant="text" width="calc(100% - 480px)" height={80} />
          <Skeleton variant="rectangular" width="calc(100% - 480px)" height={700} style={{ marginTop: 40, margin: "auto" }} />
        
      </Container>
    );
  }

  return (
    <Container maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0 0",
        overflowX: "hidden"
      }}>
      <NavbarComponent />
      {user && user.id ? (
        <PostUploadBanner userName={user.name}/>
      ) : (
        <PreUploadBanner />
      )}
      {user && user.id ? (
        <PostUploadContents 
          userName={user.name}
          averageDataByCategory={{}} 
        />
      ) : (
        <PreUploadContents />
      )}
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
};

export default AIMock;
