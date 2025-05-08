import { useState } from "react"
import "./MainSignup.css"

function MainSignup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSignup = (e) => {
    e.preventDefault()

    // Basic validation
    if (!username || !password || !confirmPassword) {
      setError("모든 필드를 입력해주세요.")
      return
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.")
      return
    }

    // Successful signup logic would go here
    setError("")
    alert("회원가입 성공!")
  }

  const handleLoginRedirect = () => {
    // Redirect to login page logic would go here
    alert("로그인 페이지로 이동합니다.")
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="app-title">FITERVIEW</h1>

        <div className="signup-form-container">
          <h2 className="signup-title">회원가입</h2>

          <form onSubmit={handleSignup} className="signup-form">
            <div className="input-group">
              <label htmlFor="username">아이디</label>
              <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="signup-button">
              회원가입
            </button>
          </form>

          <div className="login-redirect">
            <p>로그인 화면으로 돌아가기</p>
            <button className="login-button" onClick={handleLoginRedirect}>
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSignup
