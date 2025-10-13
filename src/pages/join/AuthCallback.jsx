// src/pages/join/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../../utils/token";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const email = params.get("email");
    const role = params.get("role");
    const profile = params.get("profile");

    if (accessToken && refreshToken && email && role) {
      saveTokens({ accessToken, refreshToken, email, role, profile });
      sessionStorage.setItem("profile", profile);
    }

    if (role === "USER") {
      alert("이미 가입된 계정입니다. 홈 화면으로 이동합니다.");
      navigate("/home", { replace: true });
    } else if (role === "GUEST") {
      navigate("/join?step=3", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default AuthCallback;
