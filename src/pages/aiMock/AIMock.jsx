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
import DocumentCombinationModal from "./DocumentCombinationModal";
import PreUploadBanner from "./PreUploadBanner";
import PreUploadContents from "./PreUploadContents";
import PostUploadBanner from "./PostUploadBanner";
import PostUploadContents from "./PostUploadContents";

/**
 * @component AIMock
 * @description 사용자가 면접 문서를 선택하고 조합할 수 있는 페이지
 * @returns {JSX.Element} 문서 선택 UI
 */
const AIMock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [modalType, setModalType] = useState("");

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
      <NavbarComponent 
      bgColor="transparent"
      textColor="var(--text-color)"
      isBoxShadow="none" 
      />
      {isUpload? <PostUploadBanner/>:<PreUploadBanner />}
      {isUpload? <PostUploadContents />:<PreUploadContents />}
      <PostUploadBanner />


    </Container>
  );
};

export default AIMock;
