import { Radar } from "react-chartjs-2"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"

import "./ReportMain.css"
import NavbarComponent from '../../components/Navbar'

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const ReportMain = () => {
  // Chart.js 데이터 설정
  const data = {
    labels: ["전공적합성", "창의도", "테도", "전달력", "화력"],
    datasets: [
      {
        label: "면접 결과",
        data: [80, 70, 75, 65, 85],
        backgroundColor: "rgba(23, 86, 230, 0.2)",
        borderColor: "var(--primary-color)",
        borderWidth: 2,
        pointBackgroundColor: "var(--primary-color)",
        pointBorderColor: "var(--background-color)",
        pointHoverBackgroundColor: "var(--background-color)",
        pointHoverBorderColor: "var(--primary-color)",
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
      <div className="report-content">
        <div className="report-card">
          <div className="report-info">
            <h2 className="university-info">XX대학 XX학과</h2>
            <h3 className="interview-info">모의면접 결과</h3>
          </div>

          <div className="report-data">
            <div className="chart-container">
              <Radar data={data} options={options} />
            </div>

            <div className="navigation-buttons">
              <button className="nav-button">비언어적 커뮤니케이션 분석 결과</button>
              <button className="nav-button">전달력 분석 결과</button>
              <button className="nav-button">답변 구성 분석 결과</button>
              <button className="nav-button">비교 분석 결과</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportMain
