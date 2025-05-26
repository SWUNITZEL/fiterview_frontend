/**
 * @file AIMock.jsx
 * @description AI 모의면접 페이지
 * @author 이찬우
 * @created 2025-05-07
**/

import { useEffect, useState } from "react";
import "./AIMock.css";
import { Container } from "@mui/material";
import { useUser } from '../../contexts/UserContext';
import NavbarComponent from '../../components/Navbar'
import LoadingScreen from '../../components/LoadingScreen';
import PreUploadBanner from "./PreUploadBanner";
import PreUploadContents from "./PreUploadContents";
import PostUploadBanner from "./PostUploadBanner";
import PostUploadContents from "./PostUploadContents";

const AIMock = () => {
  const [isUpload, setIsUpload] = useState(false);
  const user = useUser().user;

  return (
    <Container maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0 0",
        overflowX: "hidden"
      }}>
      <NavbarComponent />
      {user && user.id? <PostUploadBanner userName={user.name}/>:<PreUploadBanner />}
      {user && user.id? <PostUploadContents 
                          userName={user.name}
                          averageDataByCategory = {{}} />:<PreUploadContents />}
      {/* <PostUploadContents userName={userName} averageDataByCategory={averageDataByCategory} /> */}
    </Container>
  );
};

export default AIMock;
