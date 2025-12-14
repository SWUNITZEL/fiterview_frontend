import { useNavigateWithScrollTop } from '../hooks/useNavigateWithScrollTop';
import { removeAccessToken, removeRefreshToken } from "../utils/token"
import { removeItem } from "../utils/sessions"
import { useUser } from '../contexts/UserContext';
import { PATH } from '../config/paths';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
  useScrollTrigger,
  Slide,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import { useEffect, useState } from 'react';

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
  const { user } = useUser();
  const navigate = useNavigateWithScrollTop();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    removeAccessToken()
    removeRefreshToken()
    removeItem("user")
    window.location.href = PATH.MAIN
  };

  useEffect(() => {
    if (user) {
      console.log('user가 로그인됨:');
    } else {
      console.log('user가 로그아웃됨');
    }
  }, [user]);

  return (
    <HideOnScroll>
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ maxHeight: '68px', minHeight: '68px' }}>
        <Toolbar
          disableGutters
          sx={(theme) => ({
            minHeight: '68px',
            [theme.breakpoints.up('sm')]: { minHeight: '68px' },
            px: '100px',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'var(--background-color)',
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <img src="/images/default/logo.png" alt="Logo" style={{ cursor: 'pointer', height: 18 }} onClick={() => navigate(PATH.MAIN)}/>
            <Typography
              onClick={() => navigate(PATH.LEARNING)}
              variant="body2"
              sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
              className='subtitle-18-medium'
            >
              학습
            </Typography>
            <Typography
              onClick={() => navigate(PATH.PROGRESS)}
              variant="body2"
              sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
              className='subtitle-18-medium'
            >
              진행현황
            </Typography>
            <Typography
              onClick={() => navigate(PATH.ARTICLE)}
              variant="body2"
              sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
              className='subtitle-18-medium'
            >
              아티클
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            
            <Divider orientation="vertical" flexItem sx={{ height: '24px', margin: 'auto', borderBottomWidth: '2px' }} />

            {user ? (
              <>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={handleAvatarClick}
                >
                  <Avatar
                    alt={user.name}
                    src={user.profile || '/images/default/profile.png'}
                    sx={{ width: 32, height: 32 }}
                  />
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  PaperProps={{
                    elevation: 0, // 기본 그림자 제거
                    sx: {
                      boxShadow: 'none', // 추가적인 box-shadow 제거 (혹시 elevation 외 설정 있을 경우 대비)
                    },
                    className: 'drop-shadow-large' // 원하는 클래스 적용
                  }}
                >
                  {/* <MenuItem onClick={handleGoToMyPage}>마이페이지</MenuItem> */}
                  <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Typography
                  onClick={() => navigate(PATH.JOIN)}
                  variant="body2"
                  sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
                  className='subtitle-18-medium'
                >
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
                    width: '80px',
                    height: '30px',
                    border: '1px solid var(--color-blue-500)',
                    '&:hover': {
                      borderColor: 'var(--color-blue-500)',
                      backgroundColor: 'var(--color-blue-050)',
                    },
                  }}
                  className='subtitle-18-medium'
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
