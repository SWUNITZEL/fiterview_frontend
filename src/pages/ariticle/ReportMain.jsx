import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useInterviewId from '../../hooks/useInterviewId';
import NavbarComponent from '../../components/Navbar'

import { PATH } from "../../data/paths";
import Footer from '../../components/Footer';

const data = [
  { subject: "전공적합성", A: 4 },
  { subject: "집중도", A: 3 },
  { subject: "태도", A: 3 },
  { subject: "전달력", A: 5 },
  { subject: "침착함", A: 4 },
];

const ReportMain = () => {
  const navigate = useNavigate()  
  const interviewId = useInterviewId();
  
  return (
    <Container maxWidth={false} style={{
                backgroundColor: "var(--background-color)",
                minHeight: "100vh",
                padding: "0",
                overflow: "hidden",
                display: "flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center"
            }}>
      <NavbarComponent />
      <main className="drop-shadow-large" 
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        marginRight:"240px",
        marginLeft:"240px",
        marginTop:"120px",
        padding:"45px 56px",
        borderRadius:"16px",
        width:"calc(100% - 480px)",
        minWidth:"fit-content",
        maxWidth:"fit-content"
      }}>
        <h2 className="subtitle-20-bold" style={{marginTop:"0px",marginBottom:"16px",}}>XX대학 XX학과 모의면접 결과</h2>
        <div style={{
          display: "flex",
          gap: "30px",
          marginBottom: "32px",
        }}>
          {/* 왼쪽: 분석 항목 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {["비언어적 커뮤니케이션", "전달력", "답변 구성", "비교 분석"].map((title, idx) => (
              <div style={{
                backgroundColor: 'var(--nuetral-20)',
                padding: '16px',
                borderRadius: '8px',
                width:"100%",
                minWidth:"500px",
                maxWidth:"800px"
              }} key={idx}>
                <div style={{color:"var(--primary-60)", fontWeight:"600"}} className="caption-16-medium">{title}</div>
                <div className="body-16-regular">
                  {title === "비언어적 커뮤니케이션" &&
                    "자세, 시선, 제스처 등 비언어적 요소를 분석하여 면접을 평가합니다. AI 영상 분석 기반으로 객관적인 지표를 제공합니다."
                  }
                  {title === "전달력" &&
                    "어미, 톤, 속도, 어휘 등 음성 기반의 전달력 요소를 구체적으로 평가합니다. 그래프와 수치로 시각화하여 제공합니다."
                  }
                  {title === "답변 구성" &&
                    "답변의 맥락 일치 여부, 두괄식 구조, 논리성 등을 기반으로 답변 내용을 평가합니다. 항목별 피드백과 면접 영상, 개선답안을 제공합니다."
                  }
                  {title === "비교 분석" &&
                    "이전 면접 결과와 비교하여 향상된 항목 및 개선이 필요한 영역을 제시합니다. 레이더 차트를 비롯한 각종 차트로 차이를 한눈에 확인할 수 있습니다."
                  }
                </div>
              </div>
            ))}

            </div>

            {/* 오른쪽: 차트 + 총평 */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems:"center", justifyContent:"center", width: '100%', maxWidth:"400px"}}>
              <ResponsiveContainer width={260} height={220}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} />
                  <Radar
                    name="면접 결과"
                    dataKey="A"
                    stroke="#2563EB"
                    fill="#2563EB"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>

              <div style={{background : "white",
                border: "1px solid var(--nuetral-30)",
                padding:"16px",
                borderRadius: '8px',
                flex: 1
                }}>
                <div className="caption-16-medium feedback-title">면접 총평</div>
                <div className="body-16-regular feedback-content">
                  가슴 속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이오, 내일 밤이 남은 까닭이오,
                  아직 나의 청춘이 다하지 않은 까닭입니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다.
                </div>
              </div>
            </div>
          </div>
      </main>
      <Button 
      onClick={() => {
        navigate(`${PATH.REPORT_NONVERBAL}?interviewId=${interviewId}`);
        window.scrollTo(0, 0);
      }}
      sx={{
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"60px",
        marginBottom:"120px",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px 24px',
        gap: '10px',
        color:"var(--background-color)",
        fontSize:"18px",
        fontWeight:400,
        backgroundColor: 'var(--primary-60)',
        borderRadius: '8px',
        '& .MuiButton-label': {
          fontWeight: 400,
        },
        '&:hover': {
          backgroundColor: 'var(--primary-80)',
        },
     }}>세부결과 보러가기</Button>
     <Footer/>
    </Container>
  );
};

export default ReportMain;