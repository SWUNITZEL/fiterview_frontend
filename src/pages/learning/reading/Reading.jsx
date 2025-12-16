import {
  Container,
  Typography,
  Box,
  MenuItem,
  Button
} from "@mui/material";
import { useParams } from "react-router-dom";

import NavbarComponent from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import { useReport } from '../../../hooks/useReport';
import LoadingScreen from '../../../components/LoadingScreen';
import MainContainer from "../../../components/MainContainer";
import SideBar from "../../../components/Sidebar"

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
        minHeight: "1vh",
        backgroundColor: "var(--background-color)",
        padding: "0",
      }}
    >
      {/* {loading && <LoadingScreen />} */}
      <NavbarComponent />

      <MainContainer>
        <Box sx={{ display: "flex" }}>

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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "40px 60px 120px",
      }}>

        {/* 글 내용 */}
        <Box
          sx={{
            flex: 1,
            mb: 2
          }}>
            <Typography variant="body2" fontWeight={400} fontSize={"18px"} lineHeight={"28px"}>
              가슴 속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이요, 내일 밤이 남은 까닭이요, 아직 나의 청춘이 다하지 않은 까닭입니다. 별 하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와 별 하나에 어머니, 어머니, 어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러 봅니다. 그러나, 겨울이 지나고 나의 별에도 봄이 오면, 무덤 위에 파란 잔디가 피어나듯이 내 이름자 묻힌 언덕 위에도 자랑처럼 풀이 무성할 거외다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었읍니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었읍니다. 별 하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와 별 하나에 어머니, 어머니, 어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러 봅니다. 소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런 이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다. 소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런 이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다.
            </Typography>
        </Box>

        {/* 하단 버튼 */}
        <Box
          sx={{
            position: "fixed",
            bottom: "80px",
            left: "240px",
            padding: "0px 224px",
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              width: "100%",
              color: "#FFFFFF",
              bgcolor: "var(--color-blue-500)",
              fontSize: "18px",
              lineHeight: "28px",
              fontWeight: 400,
              padding: "12px 24px",
              borderRadius: "12px"
            }}>
              다음으로
          </Button>
        </Box>

    </Box>
  )
}
