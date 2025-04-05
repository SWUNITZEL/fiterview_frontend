/**
 * @file CustomH1.jsx
 * @description 
 * - 그라데이션 커스텀한 H1 컴포넌트 모음
 * @author 이찬우
 * @created 2025-04-03
 * @lastModified 2025-04-03
**/
import React from "react";

/**
 * @component 커스텀 그라데이션 H1 컴포넌트
 * @example
 * ```jsx
 * <GradientH1 text="contained"/>
 * ```
 * 
 * @param {Object} props - h1 속성
 * @param {string} [props.fontFamily="Freesentation"] - 폰트 글꼴
 * @param {string} [props.fontSize="4rem"] - 폰트 크기 
 * @param {string} [props.fontWeight="900"] - 폰트 굵기
 * @param {string} [props.padding="0px"] - padding
 * @param {string} [props.margin="0px"] - margin
 * @param {string} [props.background="var(--gradient-2)"] - 색상(css 변수 가능)
 * @param {string} [props.letterSpacing="0"] - 자간
 * @param {React.ReactNode} props.text - h1 내부 요소
 * @returns {JSX.Element} 커스텀된 h1
 */
export const GradientH1 = ({ text, fontFamily, fontSize, fontWeight, padding, margin, background, letterSpacing }) => {
  return (
    <h1
      style={{
        fontFamily: fontFamily || 'Freesentation',
        fontSize: fontSize || "4rem",
        fontWeight: fontWeight || "900",
        padding: padding || "0px",
        margin: margin || "0px",
        background: background || "var(--gradient-2)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: letterSpacing || "0"
      }}
    >
      {text}&nbsp;
    </h1>
  );
};

/**
 * @component 커스텀 그라데이션 보더 H1 컴포넌트
 * @example
 * ```jsx
 * <GradientBorderH1 text="contained"/>
 * ```
 *
 * @param {Object} props - h1 속성
 * @param {string} [props.fontFamily="Freesentation"] - 폰트 글꼴
 * @param {string} [props.fontSize="2rem"] - 폰트 크기
 * @param {string} [props.fontWeight="700"] - 폰트 굵기
 * @param {string} [props.padding="0px"] - padding
 * @param {string} [props.margin="0px"] - margin
 * @param {string} [props.background="var(--gradient-2)"] - 테두리 색상(css 변수 가능)
 * @param {string} [props.opacity="1"] - 투명도
 * @param {string} [props.border="3px"] - 보더 굵기
 * @param {React.ReactNode} props.text - h1 내부 요소
 * @returns {JSX.Element} 커스텀된 h1
 */
export const GradientBorderH1 = ({ text, fontFamily, fontSize, fontWeight, padding, margin, background, opacity, border }) => {
    return (
      <h1
        style={{
          fontFamily: fontFamily || 'Freesentation',
          fontSize: fontSize || "2rem",
          fontWeight: fontWeight || "700",
          padding: padding || "0px",
          margin: margin || "0px",

          background: background || "var(--gradient-2)",
          opacity: opacity || "1",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: background||"var(--background-color)",
          WebkitTextStroke : `${border} transparent`||"3px transparent",
        }}
      >
        &nbsp;{text}&nbsp;
      </h1>
    );
  };