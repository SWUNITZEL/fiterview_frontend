import {
  Container
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useUser } from '../../../contexts/UserContext';
import { useNavigateWithScrollTop } from '../../../hooks/useNavigateWithScrollTop';

import NavbarComponent from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import ReportTable from './ReportTable';

function Report() {
  const { chatId } = useParams()
  const { user } = useUser();
  const navigate = useNavigateWithScrollTop();

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
      <NavbarComponent />
      <ReportTable></ReportTable>      
      <Footer />
    </Container>
  );
}

export default Report;
