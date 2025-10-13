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
    if (!code) {
      navigate("/join?step=2", { replace: true });
      return;
    }

    const getToken = async () => {
      try {
        // ✅ 1️⃣ 카카오 인가 코드로 access_token 받기
        const payload = qs.stringify({
          grant_type: "authorization_code",
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code,
        });

        const kakaoRes = await axios.post("https://kauth.kakao.com/oauth/token", payload, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const kakaoAccessToken = kakaoRes.data.access_token;

        // ✅ 2️⃣ 카카오 사용자 정보 가져오기 (optional, 필요하면 유지)
        const kakaoUser = await axios.get("https://kapi.kakao.com/v2/user/me", {
          headers: { Authorization: `Bearer ${kakaoAccessToken}` },
        });

        console.log("카카오 사용자 정보:", kakaoUser.data);

        // ✅ 3️⃣ 우리 서버에 전달해서 서비스용 토큰 발급받기
        const serverRes = await axios.post(`${process.env.REACT_APP_API_URL}/auth/kakao`, {
          accessToken: kakaoAccessToken,
        });

        const { accessToken, refreshToken, email, role } = serverRes.data;

        // ✅ 4️⃣ 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        // localStorage.setItem("email", email);
        // localStorage.setItem("role", role);

        // ✅ 5️⃣ role에 따라 페이지 분기
        if (role === "GUEST") {
          navigate("/join?step=3", { replace: true }); // 신규 가입자 → 정보 입력 단계
        } else {
          navigate("/", { replace: true }); // 기존 회원 → 홈으로
        }
      } catch (err) {
        console.error("카카오 로그인 실패:", err);
        navigate("/join?step=2", { replace: true }); // 실패 시 소셜 로그인 화면으로 복귀
      }
    };

    getToken();
  }, [REST_API_KEY, REDIRECT_URI, navigate]);

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;