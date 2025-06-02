import { useState } from "react";
import { login as loginAPI } from "../api/auth";

export function useLogin(maxAttempts = 5) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleLogin = async (onSuccess) => {
    if (isLocked) return;

    try {
      const data = await loginAPI({ email, password });
      setError("");
      setLoginAttempts(0);
      if (onSuccess) onSuccess(data);
      return true
    } catch (err) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (newAttempts >= maxAttempts) {
        setIsLocked(true);
        setError("로그인 시도 횟수를 초과했습니다. 계정이 잠겼습니다.");
      } else {
        setError(err.response?.data?.message || "아이디와 비밀번호를 다시 확인해주세요.");
      }
      return false
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLocked,
    handleLogin,
  };
}
