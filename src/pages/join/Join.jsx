// src/pages/join/Join.jsx
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, TextField, Button, RadioGroup, FormControlLabel, Radio, FormLabel, Box, Typography } from '@mui/material';
import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useJoin } from '../../hooks/useJoin';
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import './Join.css';

const Join = () => {
  const location = useLocation();
  const navigate = useNavigateWithScrollTop();
  const { formData, errors, loading, handleChange, handleSubmit } = useJoin();

  // 쿼리에서 step 추출 (없으면 '1')
  const step = useMemo(() => new URLSearchParams(location.search).get('step') || '1', [location.search]);

  // 각 step별 UI를 반환하는 렌더러 (중복 return 방지)
  const renderStep = () => {
    if (step === '1') {
      return (
        <Box className="join-wrapper" sx={{ maxWidth: 640, mx: 'auto', py: 4 }}>
          <Typography variant="h4" component="h1" className="join-title" sx={{ mb: 2 }}>
            회원가입
          </Typography>

          <form className="join-form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="아이디"
              name="id"
              value={formData.id}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.id}
              helperText={errors.id}
              autoComplete="username"
            />

            <TextField
              label="비밀번호"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              autoComplete="new-password"
            />

            <TextField
              label="비밀번호 확인"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <TextField
              label="이름"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />

            <FormLabel component="legend" sx={{ mt: 2 }}>
              회원 유형
            </FormLabel>
            <RadioGroup
              row
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{ mb: 1 }}
            >
              <FormControlLabel value="학생" control={<Radio />} label="학생" />
              <FormControlLabel value="학부모" control={<Radio />} label="학부모" />
            </RadioGroup>
            {errors.role && <Typography color="error" variant="body2" sx={{ mb: 2 }}>{errors.role}</Typography>}

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              className="join-submit"
              sx={{ mt: 2 }}
            >
              {loading ? '가입 중...' : '다음 단계'}
            </Button>
          </form>
        </Box>
      );
    }

    if (step === '2') {
      return (
        <Box className="join-wrapper" sx={{ maxWidth: 640, mx: 'auto', py: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" className="join-title" sx={{ mb: 2 }}>
            회원가입 완료
          </Typography>
          <Typography variant="body1" className="join-subtext" sx={{ mb: 4 }}>
            회원가입이 정상적으로 완료되었습니다.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/login')}
            className="join-submit"
          >
            로그인 하러가기
          </Button>
        </Box>
      );
    }

    // 알 수 없는 step일 경우 기본적으로 step1 렌더
    return (
      <Box sx={{ maxWidth: 640, mx: 'auto', py: 4 }}>
        <Typography>알 수 없는 단계입니다. 다시 시도해주세요.</Typography>
      </Box>
    );
  };

  // 단일 return — 여기서 Navbar / Footer 포함
  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{
        minHeight: '100vh',
        paddingTop: 120,
      }}
    >
      <NavbarComponent />

      {renderStep()}

      <Footer />
    </Container>
  );
};

export default Join;
