import { Container } from "@mui/material";

const Footer = () => {
    return (
        <Container
          maxWidth={false}
          style={{
            position: "absolute",
            bottom: "-312px",
            width: "100%",
            backgroundColor: "var(--nuetral-20)",
            height: "312px",
            marginLeft: "-240px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding:"70px 240px",
            color:"var(--nuetral-60)"
          }}
        >
        <img style={{ height:"27px"}} src="/images/default/logo_mono.png" alt="Logo"/>
        <p>Copyright ⓒ 2025 Fiterview All right reserved | GITHUB: https://github.com/SWUNITZEL</p>
        <p style={{position: "absolute", bottom: "70px", margin:"0px"}}>서울여자대학교 | 소프트웨어융합학과 | 이찬우 김하은 서영은 염정 임효진 </p>
        </Container>
    );

}

export default Footer;