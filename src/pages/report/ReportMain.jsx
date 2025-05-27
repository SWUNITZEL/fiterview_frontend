import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import NavbarComponent from '../../components/Navbar'
import "./ReportMain.css";

const data = [
  { subject: "전공적합성", A: 4 },
  { subject: "집중도", A: 3 },
  { subject: "태도", A: 3 },
  { subject: "전달력", A: 5 },
  { subject: "침착함", A: 4 },
];

const ReportMain = () => {
  return (
    <div className="result-page-wrapper">
      <NavbarComponent />
      <main className="main-report">
        <div className="report-container drop-shadow-medium">
          <h2 className="subtitle-18-bold">XX대학 XX학과 모의면접 결과</h2>

          <div className="report-content">
            {/* 왼쪽: 분석 항목 */}
            <div className="report-left">
              {["비언어적 커뮤니케이션", "전달력", "답변 구성", "비교 분석"].map((title, idx) => (
                <div className="feedback-box" key={idx}>
                  <div className="caption-14-medium feedback-title">{title}</div>
                  <div className="body-14-regular feedback-content">
                    가슴 속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이오, 내일 밤이 남은 까닭이오,
                    아직 나의 청춘이 다하지 않은 까닭입니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다.
                  </div>
                </div>
              ))}
            </div>

            {/* 오른쪽: 차트 + 총평 */}
            <div className="report-right">
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

              <div className="feedback-box total-box">
                <div className="caption-14-medium feedback-title">면접 총평</div>
                <div className="body-14-regular feedback-content">
                  가슴 속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이오, 내일 밤이 남은 까닭이오,
                  아직 나의 청춘이 다하지 않은 까닭입니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다.
                </div>
              </div>
            </div>
          </div>

          <div className="center-horizontal">
            <button className="filled-button small-button">세부결과 보러가기</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportMain;