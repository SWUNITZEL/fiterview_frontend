import React from 'react';
import "./ChatWindow.css";
import MainContainer from "../../../components/MainContainer";

// 예시 채팅 데이터
const dummyMessages = [
  { id: 1, text: "나는 아무 걱정도 없이 가을 속의 별들을 다 헬 듯 합니다. 맑은 밤을 세워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다.", sender: 'user' },
  { id: 2, text: "나는 아무 걱정도 없이 가을 속의 별들을 다 헬 듯 합니다. 맑은 밤을 세워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다.", sender: 'ai' },
  { id: 3, text: "나는 아무 걱정도 없이 가을 속의 별들을 다 헬 듯 합니다. 맑은 밤을 세워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다.", sender: 'user' },
];

function ChatWindow({ isSidebarOpen }) {
  // isSidebarOpen에 따라 채팅 컨테이너의 중앙 정렬을 결정
  const chatWrapperStyle = {
    // 사이드바가 접혔을 때 (false)는 '0 auto'로 중앙 정렬
    margin: isSidebarOpen ? '0 0 0 40px' : '0 auto', 
    maxWidth: '800px', // 최대 너비 지정
    width: '100%',
    padding: '20px 0',
  };

  return (
    <MainContainer>
    <div className="chat-window">
      {/* 1. 채팅 내용 Wrapper: 중앙/좌측 정렬을 결정하는 핵심 요소 */}
      <div className="chat-content-wrapper" style={chatWrapperStyle}>
        
        {/* 채팅 메시지 렌더링 */}
        {dummyMessages.map(msg => (
          <div key={msg.id} className={`chat-bubble-container ${msg.sender}`}>
            <div className={`chat-bubble`}>
              {msg.text}
            </div>
          </div>
        ))}
        
      </div>
      
      {/* 2. 채팅 입력창 (항상 하단에 고정) */}
      <div className="chat-input-area">
        <input type="text" placeholder="무엇이든 물어보세요" />
        <button className="send-btn">
          <span role="img" aria-label="up arrow">↑</span>
        </button>
      </div>
    </div>
    </MainContainer>
  );
}

export default ChatWindow;