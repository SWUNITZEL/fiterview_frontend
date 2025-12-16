import { Container, TextField, Button } from "@mui/material";
import { PATH } from "../../config/paths";
import { useLogin } from "../../hooks/useLogin"
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useUser } from '../../contexts/UserContext';

function Login() {
  const navigateAndScrollTop = useNavigateWithScrollTop();
  const { refreshUser } = useUser();
  const {
    id,
    setId,
    password,
    setPassword,
    error,
    isLocked,
    handleLogin
  } = useLogin();

  /**
   * @description 로그인 버튼 이벤트 함수, 로그인 API 호출 후 성공시 유저정보 새로고침 
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin(() => {
      console.log("로그인 성공!");
    });
    if (success) {      
      await refreshUser();  
      console.log("유저 정보 새로고침 완료")
      navigateAndScrollTop(PATH.MAIN);  
    }
  };

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        height: "auto",
        padding: "0",
        overflow: "hidden",
        paddingTop: "10vh"
      }}
    >
      <NavbarComponent />
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginBottom:"120px", height: "100vh" }}>
        <h2 className="title-32-bold" style={{ marginTop: "0px", marginBottom: "50px" }}>로그인</h2>

        <form onSubmit={onSubmit} style={{ width: "400px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <TextField
            type="id"
            id="id"
            placeholder="아이디를 입력하세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
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
              '& .MuiOutlinedInput-root': {
                height: '100%',
                boxSizing: 'border-box',
                borderRadius: "8px",
                padding: 0,
                outline: 'none',
                boxShadow: 'none',
                '& input': {
                  padding: '16px 12px',
                  fontSize: '18px'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--color-blue-400)',
                  borderWidth: '2px',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--color-blue-400)',
                  borderWidth: '2px',
                },
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
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--color-blue-400)',
                  borderWidth: '2px',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--color-blue-400)',
                  borderWidth: '2px',
                },
              }
            }}
          />
          <div style={{ height: "70px", position: "relative", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection:"column" }}>
            <div style={{ fontSize: "16px", position: "absolute", right: "0px" }}>
              <span
                style={{ marginRight: "10px", cursor: 'pointer' }}
              >
                아이디 찾기
              </span>
              |
              <span
                style={{ marginLeft: "10px", cursor: 'pointer' }}
              >
                비밀번호 찾기
              </span>
            </div>
            {error && <span style={{ position: "absolute", bottom: "0px", color: "var(--color-red-600)", fontSize: "18px" }}>{error}</span>}
          </div>
          <Button
            type="submit"
            disabled={isLocked}
            fullWidth
            sx={{
              height: '56px',
              borderRadius: '8px',
              fontSize: "18px",
              backgroundColor: isLocked ? 'var(--color-gray-100)' : 'var(--color-blue-500)',
              color: isLocked ? 'var(--color-gray-500)' : 'var(--color-base-000)',
              '&:hover': {
                backgroundColor: isLocked ? 'var(--nuetral-30)' : 'var(--color-blue-400)',
              }
            }}
          >
            로그인
          </Button>
        </form>
      </div>
      <Footer/>
    </Container>
  );
}

export default Login;






