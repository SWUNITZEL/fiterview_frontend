const authorizeUrl = `${process.env.REACT_APP_SPRING_API_URL}oauth2/authorization/kakao`
  
export const handleKakaoLogin = () => {
    window.location.href = authorizeUrl;
  };