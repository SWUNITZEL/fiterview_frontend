// src/components/Navbar.jsx
import { useNavigateWithScrollTop } from "../hooks/useNavigateWithScrollTop";
import { clearTokens } from "../utils/token";
import { removeItem } from "../utils/sessions";
import { useUser } from "../contexts/UserContext";
import { PATH } from "../data/paths";
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
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({
    target: typeof window !== "undefined" ? window : undefined,
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

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();

    //모든 토큰 및 세션 정보 삭제
    clearTokens();
    removeItem("user");

    console.log("🚪 로그아웃 완료");
    window.location.href = PATH.HOME;
  };

  useEffect(() => {
    if (user) {
      console.log("user 로그인 상태:", user);
    } else {
      console.log("user 로그아웃 상태");
    }
  }, [user]);

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{ maxHeight: "50px", minHeight: "50px" }}
      >
        <Toolbar
          disableGutters
          sx={(theme) => ({
            minHeight: 50,
            [theme.breakpoints.up("sm")]: { minHeight: 50 },
            px: "240px",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "var(--background-color)",
          })}
        >
          {/* 로고 클릭 시 홈으로 이동 */}
          <Box
            onClick={() => navigate(PATH.HOME)}
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <img
              src="/images/default/logo.png"
              alt="Logo"
              style={{ height: 18 }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Typography
              onClick={() => navigate(PATH.AI_MOCK)}
              variant="body2"
              sx={{ cursor: "pointer", whiteSpace: "nowrap" }}
              className="body-14-medium"
            >
              AI 모의면접
            </Typography>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: "24px",
                margin: "auto",
                borderBottomWidth: "2px",
              }}
            />

            {/* 로그인 상태 */}
            {user ? (
              <>
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={handleAvatarClick}
                >
                  <Avatar
                    alt={user.name}
                    src={user.profile || "/images/default/profile.png"}
                    sx={{ width: 32, height: 32 }}
                  />
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  PaperProps={{
                    elevation: 0,
                    sx: { boxShadow: "none" },
                    className: "drop-shadow-large",
                  }}
                >
                  <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Typography
                  onClick={() => navigate(PATH.JOIN)}
                  variant="body2"
                  sx={{ cursor: "pointer", whiteSpace: "nowrap" }}
                  className="body-14-medium"
                >
                  회원가입
                </Typography>
                <Button
                  onClick={() => navigate(PATH.LOGIN)}
                  variant="outlined"
                  size="small"
                  sx={{
                    cursor: "pointer",
                    borderRadius: "20px",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    width: "61px",
                    height: "30px",
                    border: "1px solid var(--nuetral-50)",
                    "&:hover": {
                      borderColor: "var(--nuetral-60)",
                      backgroundColor: "var(--nuetral-30)",
                    },
                  }}
                  className="body-14-medium"
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
