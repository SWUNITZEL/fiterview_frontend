import {
  Container,
  Typography,
  Box,
  Button
} from "@mui/material";
import { useParams } from "react-router-dom";

import NavbarComponent from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import { useReport } from '../../../hooks/useReport';
import LoadingScreen from '../../../components/LoadingScreen';
import MainContainer from "../../../components/MainContainer";
import SideBar from "../../../components/Sidebar"

// 변수 받아와서 버튼 전환
const { isReading } = false;

function Reading() {
  const { chatId } = useParams()
  // const {
  //     reflection,
  //     finalReport,
  //     loading
  //   } = useReport(chatId);

  return (
    <Container
      maxWidth={false}
      style={{
        height: "100vh",
        backgroundColor: "var(--background-color)",
        padding: "0",
        overflow: "hidden",
        display: "flex"
      }}
    >
      {/* {loading && <LoadingScreen />} */}
      <NavbarComponent />

      <MainContainer sx={{ mt: "108px", mb: "40px" }}>
        <Box sx={{ height: "100%", display: "flex" }}>
          <SideBar />
          <Content />
        </Box>        
      </MainContainer>
    </Container>
  );
}

export default Reading;

function Content() {
 return (
  <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        height: "100%",
        padding: "40px 120px 80px 120px",
        ml: 2,

        "&::-webkit-scrollbar": {
          width: "8px",
        },

        /* 화살표 제거 */
        "&::-webkit-scrollbar-button": {
          display: "none",
        },

        /* 배경 */
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },

        /* 손잡이 */
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--color-gray-100)",
          borderRadius: "8px",
        },

        /* 손잡이 호버링 */
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "var(--color-gray-200)",
        }
      }}>

        {/* 글 내용 */}
        <Box
          sx={{
            flex: 1,
            mb: 2,
          }}>
            <Typography variant="body2" fontWeight={400} fontSize={"18px"} lineHeight={"28px"}>
              가슴 속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이요, 내일 밤이 남은 까닭이요, 아직 나의 청춘이 다하지 않은 까닭입니다. 별 하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와 별 하나에 어머니, 어머니, 어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러 봅니다. 그러나, 겨울이 지나고 나의 별에도 봄이 오면, 무덤 위에 파란 잔디가 피어나듯이 내 이름자 묻힌 언덕 위에도 자랑처럼 풀이 무성할 거외다.
            </Typography>
        </Box>

        {/* 하단 버튼 */}
        <Box
          sx={{
            position: "fixed",
            bottom: "40px",
            left: "360px",
            right: "120px",
            padding: "0px 120px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            disabled={isReading}
            sx={{
              width: "100%",
              color: "#FFFFFF",
              bgcolor: "var(--color-blue-500)",
              fontSize: "18px",
              lineHeight: "28px",
              fontWeight: 400,
              padding: "12px 24px",
              borderRadius: "12px",

              "&:hover" : {
                bgcolor: "var(--color-blue-600)"
              },

              "&.Mui-disabled": {
                backgroundColor: "var(--color-gray-200)",
                color: "var(--color-gray-400)",
              }
            }}>
              { isReading ? "책을 읽는 중이에요." : "다음으로" }
          </Button>
        </Box>
    </Box>
  )
}
