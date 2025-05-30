import { Container, TextField, Button, MenuItem, Select, InputLabel, OutlinedInput, FormControl, Typography, Box } from '@mui/material';
import { useJoin } from '../../hooks/useJoin';

import "./Join.css";

function Step02({ onNext, toLogin }) {
  const handleSuccess = () => {
    if (onNext) {
      onNext();
    } 
  };
  const { formData, errors, loading, handleChange, handleSubmit } = useJoin(handleSuccess);

  const genders = [
    { label: '남성', value: 'MALE' },
    { label: '여성', value: 'FEMALE' },
    { label: '기타', value: 'OTHER' },
  ];

  return (
    <Container
      maxWidth={false}
      style={{
        width: "100%",
        backgroundColor: "var(--background-color)",
        minHeight: "auto",
        paddingTop: "120px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="signup-content">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: 700,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,  // 여백 넉넉히
          }}
          noValidate
        >
          {/* 로그인 정보 영역 */}
          <Box>
            <h2 className="title-24-bold" style={{ marginTop: "0px" }}>로그인 정보</h2>
            <TextField
              fullWidth
              label="이메일"
              name="email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
            <TextField
              fullWidth
              label="비밀번호"
              name="password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
            <TextField
              fullWidth
              label="비밀번호 확인"
              name="confirmPassword"
              type="password"
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
          </Box>

          {/* 구분선 */}
          <hr
            style={{
              width: '100%',
              border: 'none',
              borderTop: '1px solid var(--neutral-30)',
              margin: '16px 0'
            }}
          />

          {/* 개인 정보 영역 */}
          <Box>
            <h2 className="title-24-bold" style={{ marginTop: "0px" }}>개인 정보</h2>
            <TextField
              fullWidth
              label="이름"
              name="name"
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
            <TextField
              fullWidth
              label="생년월일"
              name="birth"
              type="date"
              margin="normal"
              value={formData.birth}
              onChange={handleChange}
              error={Boolean(errors.birth)}
              helperText={errors.birth}
              required
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
            <FormControl fullWidth margin="normal" required error={Boolean(errors.gender)} sx={{
              borderRadius:"8px",
            }}>
              <InputLabel>성별</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                label="성별"
                onChange={handleChange}
                input={<OutlinedInput label="성별" />}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '8px',
                  }
                }}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.gender && <Typography variant="caption" color="error">{errors.gender}</Typography>}
            </FormControl>
            <TextField
              fullWidth
              label="프로모션 코드 (선택)"
              name="promotion_code"
              margin="normal"
              value={formData.promotion_code}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
          </Box>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ 
              mt: 3,
              borderRadius:"8px",
              height: '56px',
              fontSize: "16px",
              backgroundColor: 'var(--primary-60)',
              color: 'var(--nuetral-10)',
              '&:hover': {
                backgroundColor: 'var(--primary-80)',
              }
            }}
            disabled={loading}
          >
            {loading ? '회원가입 중...' : '회원가입'}
          </Button>

          {/* 로그인 페이지로 돌아가기 */}
          <h4
            className="body-16-medium"
            style={{ marginTop: "10px", cursor: "pointer", textAlign: "center" }}
            onClick={() => toLogin()}
          >
            로그인 페이지로 돌아가기
          </h4>
        </Box>
      </div>
    </Container>
  );
}

export default Step02;
