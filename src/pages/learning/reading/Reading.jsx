import {
  Container
} from "@mui/material";
import { useParams } from "react-router-dom";

import NavbarComponent from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import { useReport } from '../../../hooks/useReport';
import LoadingScreen from '../../../components/LoadingScreen';

function Reading() {
  const { chatId } = useParams()
  const {
      reflection,
      finalReport,
      loading
    } = useReport(chatId);

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

      <Footer />
    </Container>
  );
}

export default Reading;
