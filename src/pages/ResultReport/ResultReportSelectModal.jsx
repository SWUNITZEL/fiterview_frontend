import React from "react";
import { Radar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const InterviewResultModal = ({ open, onClose, data }) => {
  const navigate = useNavigate();

  // Chart.js 데이터 설정
  const chartData = {
    labels: ["전공적합성", "집중도", "태도", "전달력", "침착함"],
    datasets: [
      {
        label: "면접 평가",
        data: data, // [값1, 값2, 값3, 값4, 값5]
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2 style={{ textAlign: "center", color: "#3b82f6" }}>XX대학 XX학과 모의면접 결과</h2>

        {/* Chart.js 레이더 차트 */}
        <div style={{ width: "100%", height: "300px" }}>
          <Radar data={chartData} />
        </div>

        {/* 분석 버튼 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/nonverbal-analysis")}>
            비언어적 커뮤니케이션 분석 결과
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/delivery-analysis")}>
            전달력 분석 결과
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/answer-structure-analysis")}>
            답변 구성 분석 결과
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/comparison-analysis")}>
            비교 분석 결과
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default InterviewResultModal;
