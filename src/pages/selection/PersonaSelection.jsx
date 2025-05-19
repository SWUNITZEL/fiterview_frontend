/**
 * @file PersonaSelection.jsx
 * @description 면접관 선택 페이지
 * @author 김하은
 * @created 2025-05-17
**/


import React from "react";
import "./PersonaSelection.css";
import { personas } from "../../data/personas";
import NavbarComponent from '../../components/Navbar'

const PersonaSelection = () => {
  return (
    <div className="persona-page-wrapper">
      <NavbarComponent />

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
                  <span style={{display:"none"}}>{item.questions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-group center-horizontal">
          <button className="start-button small-button">면접 시작하기</button>
        </div>
      </main>
    </div>
  );
};

export default PersonaSelection;