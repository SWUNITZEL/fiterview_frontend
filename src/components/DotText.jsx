/**
 * @file DotText.jsx
 * @description 
 * - 폰트 위 강조점
 * - 폰트 내부에 공백 없어야 함. 2~4글자에 사용
 * @author 이찬우
 * @created 2025-04-03
 * @lastModified 2025-04-03
**/
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Dots = styled.div`
  display: flex;
  gap: ${(props) => props.spacing || "6px"}; /* 글자 간격 조절 */
  position: absolute;
  top: ${(props) => props.dotTop || "-10px"};
`;

const Dot = styled.span`
  font-size: ${(props) => props.dotSize || "20px"};
  color: ${(props) => props.dotColor || "var(--text-color)"};
`;

const Text = styled.span`
  font-size: ${(props) => props.fontSize || "20px"};
  font-weight: bold;
  color: ${(props) => props.textColor || "var(--text-color)"};
`;

/**
 * @component 텍스트 위에 점을 표시하는 컴포넌트.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {React.ReactNode} props.children - 표시할 텍스트
 * @param {string} [props.dotColor="black"] - 점의 색상
 * @param {string} [props.dotTop="-10px"] - 점의 상단 위치
 * @param {string} [props.dotLeft="50%"] - 점의 왼쪽 위치
 * @param {string} [props.dotSize="20px"] - 점의 크기
 * @param {string} [props.fontSize="20px"] - 텍스트 크기
 * @returns {JSX.Element} 스타일이 적용된 텍스트 컴포넌트
 */
export default function DotText({ children, dotColor, dotSize, dotTop, spacing, textColor, fontSize }) {
  const textArray = children.split(""); // 글자 하나씩 배열로 변환

  return (
    <Wrapper>
      {/* 점을 글자 수만큼 생성 */}
      <Dots dotTop={dotTop} spacing={spacing}>
        {textArray.map((_, index) => (
          <Dot key={index} dotColor={dotColor} dotSize={dotSize}>•</Dot>
        ))}
      </Dots>
      {/* 원래 텍스트 */}
      <Text textColor={textColor} fontSize={fontSize}>{children}</Text>
    </Wrapper>
  );
}

