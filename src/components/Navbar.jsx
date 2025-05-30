/**
 * @file Navbar.jsx
 * @description 상단 네비게이션 바
 * @author 이찬우
**/
import { useNavigateWithScrollTop } from '../hooks/useNavigateWithScrollTop';
import { useUser } from '../contexts/UserContext';
import { PATH } from '../data/paths';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
  useScrollTrigger,
  Slide,
  Avatar
} from '@mui/material';

// 스크롤 내릴 때 숨기고, 올릴 때 보여주는 Slide 애니메이션
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({
    target: typeof window !== 'undefined' ? window : undefined
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const navigate = useNavigateWithScrollTop();
  const user = useUser().user;

  return (
    <HideOnScroll>
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ maxHeight: '50px', minHeight: '50px'}}>
        <Toolbar
          disableGutters
          sx={(theme) => ({
                minHeight: 50,
                [theme.breakpoints.up('sm')]: {
                  minHeight: 50,
                },
                px: '240px',
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'var(--background-color)',
              })}
        >
          {/* 왼쪽 로고 */}
          <Box onClick={() => navigate(PATH.HOME)} sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/images/default/logo.png" alt="Logo" style={{ cursor: 'pointer', height: 18 }} />
          </Box>

          {/* 오른쪽 메뉴 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography onClick={() => navigate(PATH.AI_MOCK)} variant="body2" sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }} className='body-14-medium'>
              AI 모의면접
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ height: '24px', margin: 'auto', borderBottomWidth: '2px' }} />

            {user ? (
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(PATH.MYPAGE)}
              >
                <Avatar
                  alt={user.name}
                  src={user.profile? user.profile : '/images/default/profile.png'} // 프로필 이미지 없으면 기본 이미지
                  sx={{ width: 32, height: 32 }}
                />
              </Box>
            ) : (
              <>
                <Typography onClick={() => navigate(PATH.JOIN)} variant="body2" sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }} className='body-14-medium'>
                  회원가입
                </Typography>
                <Button
                  onClick={() => navigate(PATH.LOGIN)}
                  variant="outlined"
                  size="small"
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '20px',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    width: '61px',
                    height: '30px',
                    border: '1px solid var(--nuetral-50)',
                    '&:hover': {
                      borderColor: 'var(--nuetral-60)',
                      backgroundColor: 'var(--nuetral-30)',
                    },
                  }}
                  className='body-14-medium'
                >
                  로그인
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
