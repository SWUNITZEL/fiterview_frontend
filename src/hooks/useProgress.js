import { useEffect, useState } from "react";
import { getChatList } from "../api/chat";
import { getFinalReportList } from "../api/report";
import { getCurriculumList } from "../api/curriculum";

export function useProgress(user) {
  const [chatList, setChatList] = useState([]);
  const [curriculumList, setCurriculumList] = useState([]);
  const [finalReportList, setFinalReportList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const safeCall = async (fn, fallback = []) => {
      try {
        const result = await fn();
        console.log("[useProgress] API 성공:", result);
        return result;
      } catch (e) {
        console.warn("[useProgress] API 실패, fallback 사용:", e);
        return fallback;
      }
    };

    const fetchData = async () => {
      setLoading(true);

      const chats = await safeCall(() => getChatList());
      const curriculums = await safeCall(() => getCurriculumList());
      const finalReports = await safeCall(() => getFinalReportList());

      setChatList(chats["chats"]||[]);
      setCurriculumList(curriculums["curriculums"]||[]);
      setFinalReportList(finalReports["final_reports"]||[]);

      setLoading(false);
    };

    fetchData();
  }, [user]);

  return {
    chatList,
    curriculumList,
    finalReportList,
    loading,
  };
}
