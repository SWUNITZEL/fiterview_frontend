import { fastapiApi } from "./client";

export async function creatChatId() {
 try {
    console.log("creatChatId 요청중")
    const response = await fastapiApi.post('api/chat/create');    
    const data = response.data;
    console.log("creatChatId 성공:", data);
    return data;
  } catch (error) {
    console.warn('creatChatId 실패:', error.response || error);
    return null;
  }
}

export async function sendMessage(chatId, message) {
  try {
    console.log("sendMessage 요청중");
    const response = await fastapiApi.post(`api/chat/${chatId}/message`, {
      message: message,
    });
    const data = response.data;
    console.log("sendMessage 성공:", data);
    return data;

  } catch (error) {
    console.warn("sendMessage 실패:", error.response || error);
    return null;
  }
}

export async function getChat(chatId) {
  try {
    console.log("getChat 요청중");
    const response = await fastapiApi.get(`api/chat/${chatId}/message`);
    const data = response.data;
    console.log("getChat 성공:", data);
    return data;

  } catch (error) {
    console.warn("getChat 실패:", error.response || error);
    return null;
  }
}

export async function getChatList() {
  try {
    console.log("getChatList 요청중");
    const response = await fastapiApi.get(`api/list/chat`);
    const data = response.data;
    console.log("getChatList 성공:", data);
    return data;

  } catch (error) {
    console.warn("getChatList 실패:", error.response || error);
    return null;
  }
}