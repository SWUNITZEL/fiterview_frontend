import { Radar } from "react-chartjs-2"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"
import "./ReportMain.css"

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
        borderColor: "rgba(23, 86, 230, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(23, 86, 230, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(23, 86, 230, 1)",
      },
    ],
  }

  // Chart.js 옵션 설정
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
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
      <div className="report-header">
        <h1 className="report-title">JOBADREAM</h1>
      </div>

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
