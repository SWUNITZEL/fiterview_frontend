import { useEffect, useState } from "react";
import "./AIMock.css";
import { useUser } from '../../contexts/UserContext';
import NavbarComponent from '../../components/Navbar'
import Footer from '../../components/Footer';
import PreUploadBanner from "./PreUploadBanner";
import PreUploadContents from "./PreUploadContents";
import PostUploadBanner from "./PostUploadBanner";
import PostUploadContents from "./PostUploadContents";
import { usePdfUpload } from '../../hooks/usePdfUpload';
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from "../../data/paths";
import { useGetSchoolRecord } from '../../hooks/useGetSchoolRecord';
import { Skeleton, Container } from "@mui/material";

const AIMock = () => {
  const navigate = useNavigateWithScrollTop();
  const { user } = useUser();

  const { data: schoolRecordData, error: schoolRecordError } = useGetSchoolRecord();
  const [uploadData, setUploadData] = useState();
  const [loading, setLoading] = useState(true);
  const [redirected, setRedirected] = useState(false);
  
  useEffect(() => {
    if (schoolRecordData || schoolRecordError) {
      if (schoolRecordData && !uploadData) {
        setUploadData(schoolRecordData);
      }
      setLoading(false);
    }
  }, [schoolRecordData, schoolRecordError]);

  

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user && !redirected) {
        alert("로그인 후 이용해주세요.");
        navigate(PATH.LOGIN);
        setRedirected(true);
      }
    }, 500); // 0.5초 대기

    return () => clearTimeout(timeout); // cleanup
  }, [user, redirected]);


  const { getRootProps, getInputProps, isUploading } = usePdfUpload({
    onSuccess: (data) => {
      setUploadData(data);
      console.log(data);
    },
    onError: (err) => {
      console.log('업로드 실패', err);
    }
  });

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
      {uploadData ? (
        <PostUploadBanner 
          userName={user?user.name:"더미"}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isUploading={isUploading}
          grades={uploadData.result?.grades}
          navigate={() => navigate(PATH.INTERVIEW_CONFIG)}
        />
      ) : (
        <PreUploadBanner 
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isUploading={isUploading}
        />
      )}
      {uploadData ? (
        <PostUploadContents 
          userName={user ? user.name : "더미"}
          result={uploadData.result} 
          navigate={() => navigate(PATH.INTERVIEW_CONFIG)}
        />
      ) : (
        <PreUploadContents />
      )}
      <Footer/>
    </Container>
  );
};

export default AIMock;
