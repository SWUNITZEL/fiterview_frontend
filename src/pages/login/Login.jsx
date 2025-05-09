import { useState } from "react"
import "./Login.css"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    // Simulate login validation
    const isValidCredentials = username === "admin" && password === "password"

    if (!isValidCredentials) {
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)

      if (newAttempts >= 5) {
        setIsLocked(true)
        setError("로그인 시도 횟수를 초과했습니다. 계정이 잠겼습니다.")
      } else {
        setError("아이디와 비밀번호를 다시 확인해주세요.")
      }
    } else {
      setError("")
      // Success
      alert("로그인 성공!")
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="app-title">FITERVIEW</h1>

        <div className="login-form-container">
          <h2 className="login-title">로그인</h2>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="username">아이디</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLocked}
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
  )
}

export default Login
