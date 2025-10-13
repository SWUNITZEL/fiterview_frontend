// AuthCallback.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = window.location.search.substring(1);
    
    const params = new URLSearchParams(query);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    console.log("params", params);

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
    
    navigate("/join?step=3", { replace: true });
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default AuthCallback;