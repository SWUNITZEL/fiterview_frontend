import {
  Container
} from "@mui/material";

import { useUser } from '../../contexts/UserContext';
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';

import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';

function Report() {
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
      <Footer />
    </Container>
  );
}

export default Report;
