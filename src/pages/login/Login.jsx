import { useState } from "react";
import "./Login.css";
import { login as loginAPI } from "../../api/auth"; // auth.js 위치에 맞게 조정하세요

function Login() {
  const [email, setEmail] = useState("");  // username -> email 변경
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLocked) return;

    try {
      const data = await loginAPI({ email, password });
      setError("");
      alert("로그인 성공! 토큰:\n" + JSON.stringify(data, null, 2));
    } catch (err) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsLocked(true);
        setError("로그인 시도 횟수를 초과했습니다. 계정이 잠겼습니다.");
      } else {
        setError(err.response?.data?.message || "아이디와 비밀번호를 다시 확인해주세요.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="app-title">FITERVIEW</h1>

        <div className="login-form-container">
          <h2 className="login-title">로그인</h2>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLocked}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button" disabled={isLocked}>
              로그인
            </button>
          </form>

          <div className="signup-prompt">
            <p>계정이 없으신가요?</p>
            <button className="signup-button">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
