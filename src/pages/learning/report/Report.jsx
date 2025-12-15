import {
  Container
} from "@mui/material";
import { useParams } from "react-router-dom";

import NavbarComponent from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import ReportTable from './ReportTable';
import { useReport } from '../../../hooks/useReport';
import LoadingScreen from '../../../components/LoadingScreen';

function Report() {
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
      <ReportTable reflection={reflection} finalReport={finalReport}></ReportTable>      
      <Footer />
    </Container>
  );
}

export default Report;
