import { useEffect, useState } from "react";
import { creatReflection } from "../api/reflection";

export function useReflection(chatId) {
  const [loading, setLoading] = useState(false);

  return {
    loading,
  };
}
