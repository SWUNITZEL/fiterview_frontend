import { useEffect, useState } from "react";
import { getChatList } from "../api/chat";
import { getCurriculumList } from "../api/curriculum";

export function useLearning() {
  const [chatList, setChatList] = useState([]);
  const [curriculumList, setCurriculumList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const safeCall = async (fn, fallback = []) => {
      try {
        const result = await fn();
        console.log("[useLearning] API 성공:", result);
        return result;
      } catch (e) {
        console.warn("[useLearning] API 실패, fallback 사용:", e);
        return fallback;
      }
    };

    const fetchData = async () => {
      setLoading(true);

      const chats = await safeCall(() => getChatList());
      const curriculums = await safeCall(() => getCurriculumList());

      setChatList(chats["chats"]||[]);
      setCurriculumList(curriculums["curriculums"]||[]);

      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    chatList,
    curriculumList,
    loading,
  };
}
