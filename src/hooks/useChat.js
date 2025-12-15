import { useEffect, useState } from "react";
import { getChat, sendMessage } from "../api/chat";

export function useChat(chatId) {
  const [preChat, setPreChat] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) return;

    const safeCall = async (fn, fallback = []) => {
      try {
        const result = await fn();
        console.log("[useChat] API 성공:", result);
        return result;
      } catch (e) {
        console.warn("[useChat] API 실패, fallback 사용:", e);
        return fallback;
      }
    };

    const fetchData = async () => {
      setLoading(true);

      const chat = await safeCall(() => getChat(chatId));
      console.log("chat:", chat);

      setPreChat(chat||{});

      setLoading(false);
    };

    fetchData();
  }, [chatId]);

  const sendUserMessage = async (message) => {
    const safeCall = async (fn, fallback = null) => {
      try {
        const result = await fn();
        console.log("[useChat] sendMessage API 성공:", result);
        return result;
      } catch (e) {
        console.warn("[useChat] sendMessage API 실패, fallback 사용:", e);
        return fallback;
      }
    };

    const response = await safeCall(() => sendMessage(chatId, message));
    return response['reply'];
  }

  return {
    preChat,
    loading,
    sendUserMessage
  };
}
