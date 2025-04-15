import { Radar } from "react-chartjs-2"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"

import "./ReportMain.css"
import NavbarComponent from '../../components/Navbar'

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const ReportMain = () => {
  // Chart.js 데이터 설정
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryHoverColor = rootStyles.getPropertyValue('--primary-hover').trim();

  const data = {
    university:"서울여자대학교",
    department:"소프트웨어융합학과",
    labels: ["전공적합성", "침착성", "태도", "전달력", "집중도"],
    datasets: [
      {
        label: "면접 결과",
        data: [80, 70, 75, 65, 85],
        backgroundColor: "rgba(23, 86, 230, 0.2)",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderColor: primaryHoverColor,
        borderWidth: 3,
        pointBackgroundColor: primaryHoverColor,
        pointBorderColor: "rgba(23, 86, 230, 0.2)",
      },
    ],
  }

  // Chart.js 옵션 설정
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "var(--system-gray)",
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: "transparent",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="report-container">
      <NavbarComponent 
      bgColor="transparent"
      textColor="var(--text-color)"
      isBoxShadow="none"
      />
      <div className="report-content child-column-center">
      <div className="report-info">
            <h2 className="university-info">{data.university} {data.department}</h2>
            <h3 className="interview-info">모의면접 결과</h3>
          </div>
        <div className="report-card">
          
          <div className="report-data">
            <div className="chart-container">
              <Radar data={data} options={options} />
            </div>

            <div className="navigation-buttons">
              <button className="nav-button neumorphic-box">비언어적 커뮤니케이션 분석 결과</button>
              <button className="nav-button neumorphic-box">전달력 분석 결과</button>
              <button className="nav-button neumorphic-box">답변 구성 분석 결과</button>
              <button className="nav-button neumorphic-box">비교 분석 결과</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportMain
