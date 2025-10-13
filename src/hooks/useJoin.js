// src/hooks/useJoin.js
import { useState } from "react";
import { join } from "../api/auth";
import { BIRTH } from "../data/join";

export const useJoin = (onSuccess) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birth: BIRTH,
    gender: "",
    promotion_code: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  //입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ 유효성 검사
  const validate = () => {
    let tempErrors = {};

    // ✅ 세션에 저장된 이메일(카카오 로그인)
    const sessionEmail = sessionStorage.getItem("email");

    // ✅ 세션 이메일이 없을 때만 일반 검증 수행
    if (!formData.email && !sessionEmail)
      tempErrors.email = "이메일을 입력해주세요.";
    else if (
      !sessionEmail &&
      !/\S+@\S+\.\S+/.test(formData.email)
    )
      tempErrors.email = "유효한 이메일을 입력해주세요.";

    if (!formData.password)
      tempErrors.password = "비밀번호를 입력해주세요.";
    else if (formData.password.length < 6)
      tempErrors.password = "비밀번호는 6자 이상이어야 합니다.";

    if (formData.confirmPassword !== formData.password)
      tempErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

    if (!formData.name) tempErrors.name = "이름을 입력해주세요.";
    if (!formData.birth) tempErrors.birth = "생년월일을 입력해주세요.";
    if (!formData.gender) tempErrors.gender = "성별을 선택해주세요.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // ✅ 회원가입 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // ✅ 카카오 로그인으로부터 세션 데이터 불러오기
      const sessionEmail = sessionStorage.getItem("email");
      const sessionProfile = sessionStorage.getItem("profile");

      // ✅ 백엔드에 보낼 데이터 구성
      const signupPayload = {
        email: sessionEmail || formData.email,
        password: formData.password,
        name: formData.name,
        birth: formData.birth,
        gender: formData.gender,
        promotion_code: formData.promotion_code,
        profile: sessionProfile || null,
      };

      console.log("📨 회원가입 요청 데이터:", signupPayload);

      const response = await join(signupPayload);
      console.log("✅ 회원가입 성공:", response);
      alert("회원가입이 완료되었습니다!");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
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
