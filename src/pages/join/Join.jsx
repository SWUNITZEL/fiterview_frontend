import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from '@mui/material';
import "./Join.css";
import NavbarComponent from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../data/paths';
import { join } from '../../api/auth';

function Join() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birth: '',
    gender: '',
    promotion_code: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const genders = [
    { label: '남성', value: 'male' },
    { label: '여성', value: 'female' },
    { label: '기타', value: 'other' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.email) tempErrors.email = '이메일을 입력해주세요.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = '유효한 이메일을 입력해주세요.';

    if (!formData.password) tempErrors.password = '비밀번호를 입력해주세요.';
    else if (formData.password.length < 6) tempErrors.password = '비밀번호는 6자 이상이어야 합니다.';

    if (formData.confirmPassword !== formData.password)
      tempErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';

    if (!formData.name) tempErrors.name = '이름을 입력해주세요.';

    if (!formData.birth) tempErrors.birth = '생년월일을 입력해주세요.';

    if (!formData.gender) tempErrors.gender = '성별을 선택해주세요.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const signupPayload = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        birth: formData.birth,
        gender: formData.gender,
        promotion_code: formData.promotion_code,
      };
      const response = await join(signupPayload);
      console.log('회원가입 성공:', response);
      alert('회원가입 완료! 로그인 페이지로 이동합니다.');
      navigate(PATH.LOGIN);
    } catch (error) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0 0",
        overflow: "hidden",
        display: "flex"
      }}>
      <NavbarComponent />
      <div className="side-margin"></div>
      <div className="signup-content">
        <h1 className="app-title">FITERVIEW</h1>
        <h4 className="subtitle-18-semibold" style={{ marginTop: "0px" }}>회원가입</h4>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: 700, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }} noValidate>
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
            variant="standard"
          />
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
            variant="standard"
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
            variant="standard"
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
            variant="standard"
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
            variant="standard"
          />
          <FormControl fullWidth margin="normal" required error={Boolean(errors.gender)}>
            <InputLabel>성별</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              label="성별"
              onChange={handleChange}
              variant="standard"
            >
              {genders.map((gender) => (
                <MenuItem key={gender.value} value={gender.value}>{gender.label}</MenuItem>
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
            variant="standard"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? '회원가입 중...' : '회원가입'}
          </Button>
          <h4 className="body-16-medium" style={{ marginTop: "10px", cursor: "pointer", textAlign: "center" }} onClick={() => { navigate(PATH.LOGIN) }}>
            로그인 페이지로 돌아가기
          </h4>
        </Box>
      </div>
      <div className="side-margin"></div>
    </Container>
  );
}

export default Join;
