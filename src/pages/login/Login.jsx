import { Container, TextField, Button } from "@mui/material";

import { useLogin } from "../../hooks/useLogin";
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from "../../data/paths";

import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';

function Login() {
  const navigateAndScrollTop = useNavigateWithScrollTop();
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLocked,
    handleLogin
  } = useLogin();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin((data) => {
      alert("로그인 성공! 토큰:\n" + JSON.stringify(data, null, 2));
    });
  };

  return (
    <Container
      maxWidth={false}
      style={{
        position:"relative",
        backgroundColor: "var(--background-color)",
        height: "auto",
        paddingTop: "120px",
        overflow: "hidden"
      }}>
      <NavbarComponent />
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginBottom:"120px"}}>
        <h2 className="title-32-bold" style={{ marginTop: "0px", marginBottom: "50px" }}>로그인</h2>

        <form onSubmit={onSubmit} style={{ width: "400px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <TextField
            type="email"
            id="email"
            placeholder="email을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            required
            fullWidth
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: '56px',
              fontSize: "16px",
              '& .MuiInputBase-root': {
                height: '100%',
                boxSizing: 'border-box',
                borderRadius: "8px",
                padding: 0,
                '& input': {
                  padding: '16px 12px',
                  fontSize: '18px'
                }
              }
            }}
          />
          <TextField
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요."
            disabled={isLocked}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            required
            fullWidth
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: '56px',
              fontSize: "18px",
              '& .MuiInputBase-root': {
                height: '100%',
                boxSizing: 'border-box',
                borderRadius: "8px",
                padding: 0,
                '& input': {
                  padding: '16px 12px',
                  fontSize: '18px'
                }
    
              }
            }}
          />
          <div style={{ height: "70px", position: "relative", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection:"column" }}>
            <div style={{ color: "var(--nuetral-60)", fontSize: "16px", position: "absolute", right: "0px" }}>
              <span
                style={{ marginRight: "10px", cursor: 'pointer' }}
                onClick={() => navigateAndScrollTop('/find-id')}
              >
                아이디 찾기
              </span>
              |
              <span
                style={{ marginLeft: "10px", cursor: 'pointer' }}
                onClick={() => navigateAndScrollTop('/find-password')}
              >
                비밀번호 찾기
              </span>
            </div>
            {error && <span style={{ position: "absolute", bottom: "0px", color: "var(--error-60)", fontSize: "16px" }}>{error}</span>}
          </div>
          <Button
            type="submit"
            disabled={isLocked}
            fullWidth
            sx={{
              height: '56px',
              borderRadius: '8px',
              fontSize: "16px",
              backgroundColor: isLocked ? 'var(--nuetral-30)' : 'var(--primary-60)',
              color: isLocked ? 'var(--nuetral-50)' : 'var(--nuetral-10)',
              '&:hover': {
                backgroundColor: isLocked ? 'var(--nuetral-30)' : 'var(--primary-80)',
              }
            }}
          >
            로그인
          </Button>
        </form>
        <div style={{ width: "400px" }}>
          <Button
            fullWidth
            onClick={()=>navigateAndScrollTop(PATH.JOIN)}
            sx={{
              height: '56px',
              borderRadius: '8px',
              mt: "12px",
              fontSize: "16px",
              border: "1px solid var(--nuetral-50)",
              backgroundColor: 'var(--nuetral-10)',
              color: 'var(--font-body)',
              '&:hover': {
                backgroundColor: 'var(--nuetral-20)',
              }
            }}
          >
            회원가입
          </Button>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default Login;
