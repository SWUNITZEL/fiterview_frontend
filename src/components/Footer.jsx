import { Container } from "@mui/material";

const Footer = () => {
    return (
        <Container
          maxWidth={false}
          style={{
            position:"relative",
            width: "100%",
            backgroundColor: "var(--color-gray-050)",
            height: "416px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding:"100px 96px",
            color:"var(--color-gray-700)"
          }}
        >
        <img style={{ height:"27px"}} src={`${process.env.PUBLIC_URL}/images/default/logo_mono.png`} alt="Logo"/>
        <p style={{ marginTop:"24px", marginBottom: "8px"}}>주소: 01797 서울시 노원구 화랑로 621, 서울여자대학교</p>
        <p style={{ marginTop:"0px", marginBottom: "8px"}}>대표이사: 000 | 사업자등록번호: 000-00-00000 | 통신판매신고번호: 제 2025-서울-00000호</p>
        <p style={{ marginTop:"0px", marginBottom: "8px"}}>전화: 000-0000-0000 | 메일: 0000@email.com</p>
        <p style={{ marginTop:"24px", marginBottom: "24px"}}>공지사항 | 이용약관 | 개인정보처리방침 | 청소년보호정책 | 자주묻는질문</p>
        <p style={{ marginBottom: "100px"}}>Copyright © 2025 Nexture. All rights reserved.</p>
      </Container>
    );

}

export default Footer;