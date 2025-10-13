// AuthCallback.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAccessToken, saveRefreshToken } from "../../utils/token";  // 토큰 저장 유틸 함수

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = window.location.search.substring(1);
    
    const params = new URLSearchParams(query);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const email = params.get("email");
    const role = params.get("role");

    console.log("params", params);

    // email 등 저장하기
    if (accessToken && refreshToken) {
      saveAccessToken(accessToken);
      saveRefreshToken(refreshToken);
    }
    
    if (role === "USER") {
      navigate("/home", { replace: true });
      return;
    }
    else {
      navigate("/join?step=3", { replace: true });
    }
  }, [navigate]);

  return (<div>로그인 처리중...</div>);
};

export default AuthCallback;