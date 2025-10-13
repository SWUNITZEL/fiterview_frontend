import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

function KakaoCallback() {
  const navigate = useNavigate();
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) return;

    const getToken = async () => {
      try {
        const payload = qs.stringify({
          grant_type: "authorization_code",
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code,
        });

        const res = await axios.post("https://kauth.kakao.com/oauth/token", payload, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const { accessToken, refreshToken, email, role } = serverRes.data;

        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(REST_API_KEY);
        }
        window.Kakao.Auth.setAccessToken(accessToken);

        const userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log("카카오 사용자 정보:", userInfo.data);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        if (role === "GUEST") {
          navigate("/join?step=3", { replace: true }); // 신규 가입자 → 정보 입력 단계
        } else {
          navigate("/", { replace: true }); // 기존 회원 → 홈으로
        }
      } catch (err) {
        console.error("카카오 회원가입 실패:", err);
        navigate("/join?step=2", { replace: true });
      }
    };

    getToken();
  }, [REST_API_KEY, REDIRECT_URI, navigate]);

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
