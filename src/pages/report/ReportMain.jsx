import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import NavbarComponent from '../../components/Navbar'
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH } from "../../data/paths";

const data = [
  { subject: "전공적합성", A: 4 },
  { subject: "집중도", A: 3 },
  { subject: "태도", A: 3 },
  { subject: "전달력", A: 5 },
  { subject: "침착함", A: 4 },
];

const ReportMain = () => {
  const navigate = useNavigate()
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
        marginBottom:"40px",
        padding:"45px 56px",
        borderRadius:"16px",
        width:"calc(100% - 480px)"
      }}>
        <h2 className="subtitle-20-bold" style={{marginTop:"0px",marginBottom:"16px",}}>XX대학 XX학과 모의면접 결과</h2>
        <div style={{
          display: "flex",
          gap: "30px",
          marginBottom: "32px"
        }}>
          {/* 왼쪽: 분석 항목 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {["비언어적 커뮤니케이션", "전달력", "답변 구성", "비교 분석"].map((title, idx) => (
              <div style={{
                backgroundColor: 'var(--nuetral-20)',
                padding: '16px',
                borderRadius: '8px',
                width:"600px",
              }} key={idx}>
                  <div style={{color:"var(--primary-60)"}} className="caption-16-medium">{title}</div>
                  <div className="body-16-regular">
                    가슴 속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이오, 내일 밤이 남은 까닭이오,
                    아직 나의 청춘이 다하지 않은 까닭입니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다.
                  </div>
                </div>
              ))}
            </div>

            {/* 오른쪽: 차트 + 총평 */}
            <div style={{display: 'flex', flexDirection: 'column'}}>
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
        navigate(PATH.REPORT_NONVERBAL);
        window.scrollTo(0, 0);
      }}
      sx={{
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"0px",
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
    </Container>
  );
};

export default ReportMain;