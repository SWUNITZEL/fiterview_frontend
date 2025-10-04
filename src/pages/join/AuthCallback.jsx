// AuthCallback.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = window.location.search.substring(1);
    
    const params = new URLSearchParams(query);
    const at = params.get("accessToken");
    const rt = params.get("refreshToken");

    console.log("토큰:", at, rt);

    if (at && rt) {
      localStorage.setItem("accessToken", at);
      localStorage.setItem("refreshToken", rt);
    }
    
    navigate("/join?step=3", { replace: true });
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default AuthCallback;