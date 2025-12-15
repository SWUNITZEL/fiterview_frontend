import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import "./ChatWindow.css";
import MainContainer from "../../../components/MainContainer";

function ChatWindow({ isSidebarOpen, handleSend, preChat, navigate, chatId }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef(null);

  const chatWrapperStyle = {
    margin: isSidebarOpen ? '0 0 0 40px' : '0 auto',
    maxWidth: '800px',
    width: '100%',
    padding: '20px 0',
  };

  const onSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      content: inputValue,
      role: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    try {
      const aiReply = await handleSend(inputValue);

      const aiMessage = {
        id: Date.now() + 1,
        content: aiReply,
        role: 'assistant',
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (e) {
      console.error("AI 응답 오류:", e);
    }
  };

  // preChat이 변경될 때 메시지 세팅
  useEffect(() => {
    if (!preChat?.chat_messages) return;

    const initChat = async () => {
      // 채팅이 비어 있을 때
      if (preChat.chat_messages.length < 1) {
        try {
          const aiReply = await handleSend("독서토론을 시작해볼까요?");

          setMessages([
            {
              id: Date.now(),
              content: aiReply,
              role: "assistant",
            },
          ]);
        } catch (e) {
          console.error("AI 응답 오류:", e);
        }
        return;
      }

      // 기존 채팅 있을 때 (첫 메시지 제거)
      setMessages(
        preChat.chat_messages.slice(1).map((msg, idx) => ({
          id: idx,
          content: msg.content,
          role: msg.role,
        }))
      );
    };

    initChat();
  }, [preChat, handleSend]);


  // 스크롤 자동 하단
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  

  return (
    <MainContainer>
      <div className="chat-window">
        <div className="chat-content-wrapper" style={chatWrapperStyle}>
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`chat-bubble-container ${msg.role}`}
            >
              <div className="chat-bubble">{msg.content}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {messages.length<6?
        (<div className="chat-input-area">
          <input
            type="text"
            placeholder="무엇이든 물어보세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
          />
          <button className="send-btn" onClick={onSend}>↑</button>
        </div>):
        (<div className="chat-input-area">
          <Button 
          onClick={()=>navigate(`/learning/reflection/${chatId}`)}
          variant="outlined" 
          sx={{
            color: 'var(--color-base-000)',
            borderColor: 'var(--color-blue-500)',
            backgroundColor: 'var(--color-blue-500)',
            borderRadius: '8px',
            fontSize: '18px',
            height: '52px',
            width: "800px",
            textTransform: 'none',
            mb: "60px",
            '&:hover': {
              borderColor: 'var(--color-blue-400)',
            backgroundColor: 'var(--color-blue-400)',
            },
          }}
          >다음으로
          </Button>
          </div>)}
      </div>
    </MainContainer>
  );
}

export default ChatWindow;
