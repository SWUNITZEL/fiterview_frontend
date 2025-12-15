import {
  Container
} from "@mui/material";
import { useParams } from "react-router-dom";
// import { useUser } from '../../../contexts/UserContext';
import { useNavigateWithScrollTop } from '../../../hooks/useNavigateWithScrollTop';

import NavbarComponent from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import ChatWindow from './ChatWindow';
import { useChat } from '../../../hooks/useChat';
import LoadingScreen from '../../../components/LoadingScreen';

function Report() {
  const { chatId } = useParams()
  const {
      preChat,
      loading,
      sendUserMessage
    } = useChat(chatId);

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
      {loading && <LoadingScreen />}
      <NavbarComponent />
      <ChatWindow handleSend={sendUserMessage} preChat={preChat["chat"]}></ChatWindow>      
    </Container>
  );
}

export default Report;
