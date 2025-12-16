import {
  Container
} from "@mui/material";
import { useParams } from "react-router-dom";

import NavbarComponent from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import { useReflection } from '../../../hooks/useReflection';
import LoadingScreen from '../../../components/LoadingScreen';
import MainContainer from "../../../components/MainContainer";
import { formatDateYMD, getCreateDate } from "../../../utils/date";

function Reflection() {
  const { chatId } = useParams()
  const {
      loading
    } = useReflection(chatId);

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        height: "auto",
        padding: "0",
        overflow: "hidden"
      }}
    >
      {loading && <LoadingScreen />}
      <NavbarComponent />
        <MainContainer>
        </MainContainer>
      <Footer />
    </Container>
  );
}

export default Reflection;
