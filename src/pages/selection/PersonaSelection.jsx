/**
 * @file PersonaSelection.jsx
 * @description 면접관 선택 페이지
 * @author 김하은
 * @created 2025-05-17
**/


import React from "react";
import "./PersonaSelection.css";
import { personas } from "../../data/personas";

const PersonaSelection = () => {
  return (
    <div className="persona-page-wrapper">
      <header className="logo-header">
        <img src="/logo-placeholder.png" alt="로고" className="logo-img" />
        <div className="header-right">
          <span className="login-placeholder">AI 모의면접</span>
          <div className="avatar-placeholder"></div>
        </div>
      </header>

      <main className="persona-content child-column-center">
        <h2 className="title-24-bold title-center">어떤 면접관과 연습 면접을 진행할까요?</h2>
        <span className="body-14-medium pagination-text">(1/2)</span>

        <div className="persona-list">
          {personas.map((item) => (
            <div className="persona-box drop-shadow-small" key={item.id}>
              <div className="persona-box-left">
                <img src="/logo-placeholder.png" alt="면접관 이미지" className="persona-img" />
              </div>
              <div className="persona-box-right">
                <div className="subtitle-18-bold persona-name">
                  {item.name}{" "}
                  <span className="persona-role">{item.role}</span>
                </div>
                <div className="body-14-regular persona-desc">{item.description}</div>
                <div className="caption-14-regular persona-questions">
                  {item.questions}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-group center-horizontal">
          <button className="start-button small-button">면접 시작하기</button>
        </div>
      </main>

      <div className="divider-line"></div>
      <footer className="footer-area">
        <hr className="footer-divider" />
        <div className="footer-info">
          <div className="footer-links">
            <span>슈니첼</span>
            <span>이용약관</span>
            <span className="highlight">개인정보처리방침</span>
            <span className="highlight">임시저장</span>
          </div>
          <div className="footer-desc">
            (주)슈니첼 | 사업자등록번호 000-00-00000 | 통신판매업 신고번호 2025-서울노원-2025<br />
            02-0000-0000 | official@swu | 서울특별시 노원구 화랑로 621 (슈니첼)<br />
            © SWU Corp. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PersonaSelection;