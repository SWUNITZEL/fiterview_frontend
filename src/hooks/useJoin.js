// useJoinForm.js
import { useState } from 'react';
import { join } from '../api/auth';
import { useNavigateWithScrollTop } from './useNavigateWithScrollTop';
import { getItem } from "../utils/sessions";

export const useJoin = () => {
  const navigate = useNavigateWithScrollTop();
  
  const onSuccess = () => {
    navigate('/join?step=4');
  }
  const [formData, setFormData] = useState({
    id: getItem("id") || '',
    password: '',
    confirmPassword: '',
    name: '',
    role: '',
  });

  console.log("Initial id:", formData.id);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.id) tempErrors.id = '아이디를 입력해주세요.';
    // else if (!/\S+@\S+\.\S+/.test(formData.id)) tempErrors.id = '유효한 이메일을 입력해주세요.';

    if (!formData.password) tempErrors.password = '비밀번호를 입력해주세요.';
    else if (formData.password.length < 6) tempErrors.password = '비밀번호는 6자 이상이어야 합니다.';

    if (formData.confirmPassword !== formData.password)
      tempErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';

    if (!formData.name) tempErrors.name = '이름을 입력해주세요.';

    if (!formData.role) tempErrors.role = '회원 유형을 선택해주세요.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const signupPayload = {
        id: formData.id,
        password: formData.password,
        name: formData.name,
        birth: formData.birth,
        role: formData.role,
        relation: '',
      };
      const response = await join(signupPayload);
      console.log('회원가입 성공:', response);
      alert('회원가입 완료!');

      // 여기서 onSuccess 콜백 호출
      if (onSuccess) onSuccess();
    } catch (error) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
};
