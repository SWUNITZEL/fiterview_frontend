import { useState } from "react"
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
import "./Signup.css"
import NavbarComponent from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/paths';


function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    region: '',
    academyCode: '',
  });

  const [errors, setErrors] = useState({});

  const genders = ['남성', '여성', '기타'];
  const regions = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '기타'];

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

    if (!formData.age) tempErrors.age = '나이를 입력해주세요.';
    else if (isNaN(formData.age) || formData.age < 0) tempErrors.age = '유효한 나이를 입력해주세요.';

    if (!formData.gender) tempErrors.gender = '성별을 선택해주세요.';
    if (!formData.region) tempErrors.region = '지역을 선택해주세요.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // 서버 전송 등 처리
      console.log('회원가입 정보:', formData);
      alert('회원가입 완료!');
    }
  };

  return (
    <Container maxWidth={false}
                      style={{
                        backgroundColor: "var(--background-color)",
                        minHeight: "100vh",
                        padding: "0 0",
                        overflow: "hidden",
                        display:"flex"
                      }}>
      <NavbarComponent />
      <div className="side-margin"></div>
      <div className="signup-content">
        <h1 className="app-title">FITERVIEW</h1>
        <h4 className="subtitle-18-semibold" style={{marginTop:"0px"}}>회원가입</h4>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: 700, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2,}} noValidate>
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
            label="나이"
            name="age"
            type="number"
            margin="normal"
            value={formData.age}
            onChange={handleChange}
            error={Boolean(errors.age)}
            helperText={errors.age}
            required
            inputProps={{ min: 0 }}
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
                <MenuItem key={gender} value={gender}>{gender}</MenuItem>
              ))}
            </Select>
            {errors.gender && <Typography variant="caption" color="error">{errors.gender}</Typography>}
          </FormControl>

          <FormControl fullWidth margin="normal" required error={Boolean(errors.region)}>
            <InputLabel>지역</InputLabel>
            <Select
              name="region"
              value={formData.region}
              label="지역"
              onChange={handleChange}
              variant="standard"
            >
              {regions.map((region) => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </Select>
            {errors.region && <Typography variant="caption" color="error">{errors.region}</Typography>}
          </FormControl>

          <TextField
            fullWidth
            label="학원 제휴 코드 (선택)"
            name="academyCode"
            margin="normal"
            value={formData.academyCode}
            onChange={handleChange}
            variant="standard"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            회원가입
          </Button>
          <h4 className="body-16-medium" style={{marginTop:"10px", cursor:"pointer", textAlign:"center"}} onClick={()=>{navigate(PATH.LOGIN)}}>로그인 페이지로 돌아가기</h4>
          
        </Box>
      </div>
      <div className="side-margin"></div>
    </Container>
  )
}

export default Signup
