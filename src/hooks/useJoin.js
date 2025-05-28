// useJoinForm.js
import { useState } from 'react';
import { join } from '../api/auth';

export const useJoin = (onSuccess) => {
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
