/**
 * @file DocumentCombinationModal.jsx
 * @description 면접 조합 모달 컴포넌트2
 */

import React from "react";
import "./DocumentCombinationModal.css";

/**
 * @component DocumentCombinationModal
 * @description 면접 조합을 선택하거나 새로운 조합을 입력하는 모달
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.type - 모달 유형 (recent, previous, new)
 * @param {Function} props.onClose - 모달 닫기 함수
 * @returns {JSX.Element} 면접 조합 모달 UI
 */
const DocumentCombinationModal = ({ type, onClose }) => {
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>
          <span>
            {type === "recent" && "최근 면접 조합"}
            {type === "previous" && "이전 면접 조합"}
            {type === "new" && "새로운 면접 조합"}
          </span>
        </h2>
        {type === "new" && (
          <form>
            <label><span>지원 학교</span></label>
            <input type="text" placeholder="학교명을 입력하세요" />
            <label><span>지원 학과</span></label>
            <input type="text" placeholder="학과명을 입력하세요" />
            <label><span>질문 개수 선택</span></label>
            <select>
              <option><span>4개</span></option>
              <option><span>5개</span></option>
              <option><span>6개</span></option>
            </select>
            <label><span>면접일 (YYYY MM DD)</span></label>
            <input type="text" placeholder="예: 2024 09 29" />
          </form>
        )}
        <button onClick={onClose}><span>저장</span></button>
      </div>
    </div>
  );
};

export default DocumentCombinationModal;
