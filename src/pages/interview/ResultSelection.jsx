import React, { useState } from "react";
import InterviewResultModal from "./InterviewResultModal";

const InterviewPage = () => {
  const [open, setOpen] = useState(false);

  // 예제 점수 데이터 (0~100)
  const sampleData = [80, 75, 85, 70, 90];

  return (
    <div>
      <button onClick={() => setOpen(true)}>모의면접 결과 보기</button>
      <InterviewResultModal open={open} onClose={() => setOpen(false)} data={sampleData} />
    </div>
  );
};

export default InterviewPage;
