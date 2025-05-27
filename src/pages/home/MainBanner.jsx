/**
 * @file MainBanner.jsx
 * @description 메인인 배너
 * @author 이찬우
 * @created 2025-05-07
**/
import {Button} from "@mui/material";

const MainBanner = ({onNavigate}) => {

    return (
        <div className="center-both child-column-center" 
        style={{
            width:"100%", 
            minHeight:"707px",
            height:"100vh",
            backgroundImage: `url("/images/home/banner.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center center"}} >
            <h4 className="title-24-medium" style={{marginTop:"70px", marginBottom:"20px"}}>실전처럼, AI 면접으로 완벽 대비!</h4>
            <h1 className="title-40-bold" style={{marginTop:"0px"}}>AI 면접관과 함께하는 최적의 입시 면접 연습</h1>
            <h4 className="subtitle-18-medium" style={{marginTop:"30px"}}>맞춤형 질문부터 AI 분석까지, 면접 준비의 새로운 기준</h4>
            <Button 
            onClick={()=>onNavigate()}
            sx={{
                marginLeft:"auto",
                marginRight:"auto",
                marginTop:"100px",
                marginBottom:"0px",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                gap: '10px',
                width: '320px',
                height: '64px',
                color:"var(--background-color)",
                fontSize:"18px",
                fontWeight:500,
                backgroundColor: 'var(--primary-60)',
                borderRadius: '8px',
                '& .MuiButton-label': {
                  fontWeight: 500,
                },
                '&:hover': {
                backgroundColor: 'var(--primary-80)',
                },
            }}><span style={{
                color:"var(--background-color)",
                fontSize:"18px",
                fontWeight:500,
            }}>지금 바로 AI 면접 시작하기</span></Button>
        </div>
    );
};

export default MainBanner;