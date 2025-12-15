import { useEffect, useState } from "react";
import { getReflection } from "../api/reflection";
import { getFinalReport } from "../api/report";

export function useReport(chatId) {
  const [reflection, setReflection] = useState({});
  const [finalReport, setFinalReport] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) return;

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

      const book_report = await safeCall(() => getReflection(chatId));
      const final_report = await safeCall(() => getFinalReport(chatId));

      setFinalReport(final_report["final_report"]||{});
      setReflection(book_report["book_report"]||{});

      setLoading(false);
    };

    fetchData();
  }, [chatId]);

  return {
    reflection,
    finalReport,
    loading,
  };
}
