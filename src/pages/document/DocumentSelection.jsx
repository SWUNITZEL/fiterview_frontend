/**
 * @file DocumentSelection.jsx
 * @description 면접 문서 선택 페이지 컴포넌트2
 */

import React, { useState } from "react";
import DocumentCombinationModal from "./DocumentCombinationModal";
import "./DocumentSelection.css";

/**
 * @component DocumentSelection
 * @description 사용자가 면접 문서를 선택하고 조합할 수 있는 페이지
 * @returns {JSX.Element} 문서 선택 UI
 */
const DocumentSelection = () => {
  /**
   * @state {boolean} isModalOpen - 모달 창 열림 여부
   * @state {string} modalType - 현재 열린 모달의 타입 (recent, previous, new)
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  /**
   * @function handleCombinationClick
   * @description 면접 조합 버튼 클릭 시 모달 열기
   * @param {string} type - 열려는 모달 타입
   */
  const handleCombinationClick = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="documentSelectionContainer">
      <h1><span>문서 선택</span></h1>
      <button onClick={() => handleCombinationClick("recent")} className="combinationBtn">
        <span>최근 면접 조합</span>
      </button>
      <div className="previousCombinations">
        <h2><span>다른 학교 면접 준비할래요!</span></h2>
        <div className="combinationList">
          {["조합1", "조합2", "조합3", "조합4"].map((combo, index) => (
            <button key={index} className="comboItem" onClick={() => handleCombinationClick("previous")}>
              <span>{combo}</span>
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => handleCombinationClick("new")} className="newComboBtn">
        <span>새로운 조합 작성</span>
      </button>
      <button className="uploadBtn">
        <span>생기부 업로드</span>
      </button>
      {isModalOpen && <DocumentCombinationModal type={modalType} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default DocumentSelection;
