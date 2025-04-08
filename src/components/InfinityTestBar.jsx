/**
 * @file InfinityTestBar.jsx
 * @description 
 * - 무한하게 흐르는 텍스트 바 컴포넌트
 * - 애니메이션을 적용하여 텍스트가 오른쪽에서 왼쪽으로 흐르는 효과 제공
 * @author 이찬우
 * @created 2025-04-03
 * @lastModified 2025-04-03
 */

import React from "react";
import styled from "@emotion/styled";

// 애니메이션 키프레임 정의
const textToRight = `
  @keyframes text-to-right {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;

// 컨테이너 스타일 (전체 박스)
const Wrapper = styled.div`
  grid-column: 1 / -1;
  width: 100vw;
  white-space: nowrap;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: ${(props) => props.bgGradient  || "var(--gradient-1)"};
  border: ${(props) => props.border || "var(--div-border, none)"};
  padding: ${(props) => props.padding || "0px"};
  margin: ${(props) => props.margin || "0px"};
`;

// 텍스트 스타일
const InfinityP = styled.p`
  font-size: ${(props) => props.fontSize || "20px"};
  font-weight: bold;
  color: ${(props) => props.textColor || "var(--button-text, var(--background-color))"};
  display: inline-block;
  animation: text-to-right 200s linear infinite;
  white-space: nowrap;
  margin: 8px;

  /* 애니메이션 추가 */
  ${textToRight}
`;

export const InfinityTestBar = ({
  fontSize,
  textColor,
  bgGradient ,
  border,
  padding,
  margin,
  text = "FITERVIEW\u00A0\u00A0✦\u00A0\u00A0WELCOME TO FITERVIEW\u00A0\u00A0✦\u00A0\u00A0FITERVIEW\u00A0\u00A0✦\u00A0\u00A0WELCOME TO FITERVIEW\u00A0\u00A0✦\u00A0\u00A0FITERVIEW\u00A0\u00A0✦\u00A0\u00A0WELCOME TO FITERVIEW\u00A0\u00A0✦\u00A0\u00A0FITERVIEW\u00A0\u00A0✦\u00A0\u00A0WELCOME TO FITERVIEW\u00A0\u00A0✦\u00A0\u00A0FITERVIEW\u00A0\u00A0✦\u00A0\u00A0WELCOME TO FITERVIEW\u00A0\u00A0✦\u00A0\u00A0FITERVIEW\u00A0\u00A0✦\u00A0\u00A0WELCOME TO FITERVIEW\u00A0\u00A0✦\u00A0\u00A0FITERVIEW\u00A0\u00A0✦\u00A0\u00A0WELCOME TO FITERVIEW\u00A0\u00A0✦\u00A0\u00A0FITERVIEW\u00A0\u00A0✦\u00A0\u00A0WELCOME TO FITERVIEW\u00A0\u00A0✦\u00A0\u00A0FITERVIEW\u00A0\u00A0✦\u00A0\u00A0WELCOME TO FITERVIEW\u00A0\u00A0✦\u00A0\u00A0FITERVIEW\u00A0\u00A0✦\u00A0\u00A0WELCOME TO FITERVIEW\u00A0\u00A0✦\u00A0\u00A0"
}) => {
  return (
    <Wrapper 
      bgGradient ={bgGradient }
      border={border}
      padding={padding}
      margin={margin}
    >
      <InfinityP fontSize={fontSize} textColor={textColor}>
        {text.repeat(10)} {/* 텍스트 반복 */}
      </InfinityP>
    </Wrapper>
  );
};
