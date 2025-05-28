import { Container, Button } from "@mui/material";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import './Join.css';

const Step03 = ({onNext}) => {

  return (
    <Container
      maxWidth={false}
      style={{
        width:"100%",
        backgroundColor: "var(--background-color)",
        minHeight: "auto",
        paddingTop: "120px",
        overflow: "hidden",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
      }}
    >
      <CheckCircleIcon style={{height:"96px", color:"var(--primary-40)"}} />
      <h1 className='title-24-bold'>회원가입 완료</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={onNext}
        sx={{
            borderRadius:"8px",
            marginTop: '48px',
            height: '48px',
            backgroundColor: 'var(--primary-60)',
            color: 'white'
        }}
        >
        로그인 하러가기
        </Button>
    </Container>
  );
};

export default Step03;
