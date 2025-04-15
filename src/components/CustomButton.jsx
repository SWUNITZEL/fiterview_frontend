/**
 * @file CustomButton.jsx
 * @description 
 * - Mui 커스텀 버튼 모음
 * @author 이찬우
 * @created 2025-04-03
 * @lastModified 2025-04-03
**/
/** @jsxImportSource @emotion/react */
import { Button } from "@mui/material";
import styled from "@emotion/styled";

/**
 * 커스텀 MUI 버튼 컴포넌트
 *
 * CSS 변수를 활용하여 버튼의 배경색, 테두리, 텍스트 색상 등을 동적으로 변경할 수 있음.
 * - `--button-bg`: 기본 배경 색상
 * - `--button-hover-bg`: 호버 시 배경 색상
 * - `--button-text`: 기본 텍스트 색상
 * - `--button-hover-text`: 호버 시 텍스트 색상
 * - `--button-border`: 기본 테두리 스타일
 * - `--button-hover-border`: 호버 시 테두리 스타일
 * - `--button-radius`: 버튼의 둥근 정도
 * - `--button-padding`: 버튼 내부 패딩
 *
 * @component
 * @example
 * ```jsx
 * <CustomButton variant="contained">
 *   지원하기
 * </CustomButton>
 * ```
 *
 * @param {Object} props - 버튼 속성
 * @param {string} [props.fontSize="20px"] - 버튼 폰트 크기
 * @param {React.ReactNode} props.children - 버튼 내부 요소
 * @returns {JSX.Element} 커스텀된 MUI 버튼
 */
const CustomStyledButton = styled(Button)`
  margin: ${(props) => props.margin || "0px"};
  font-size: ${(props) => props.fontSize || "20px"};
  font-weight: 400;
  color: ${(props) => props.textColor || "var(--background-color)"}; /* 기본 텍스트 색상 */
  background-color: ${(props) => props.bgColor || "var(--button-bg, var(--primary-color))"}; /* 기본 배경색 */
  border: ${(props) => props.border || "var(--button-border, none)"}; /* 테두리 */
  border-radius: ${(props) => props.borderRadius || "9999px"}; /* 둥글기 */
  padding: ${(props) => props.padding || "2px 20px"}; /* 패딩 */
  transition: all 0.3s ease-in-out;
  width: fit-content;
  white-space: nowrap;

  &:hover {
    font-weight: 500;
    background-color: ${(props) => props.hoverBgColor || "var(--button-hover-bg, var(--primary-hover))"}; /* 호버 시 배경 */
    color: ${(props) => props.hoverTextColor || "var(--button-hover-text, var(--background-color))"}; /* 호버 시 텍스트 */
    border: ${(props) => props.hoverBorder || "var(--button-hover-border, none)"}; /* 호버 시 테두리 */
  }
  
  .MuiTouchRipple-root .MuiTouchRipple-rippleVisible {
    color: ${(props) => props.rippleColor || "var(--primary-lightest)"};
  }
`;

/**
 * MUI 버튼을 감싸서 스타일을 커스텀할 수 있는 컴포넌트
 *
 * @param {Object} props - 버튼 속성
 * @param {string} [props.margin] - 버튼 margin
 * @param {string} [props.fontSize] - 버튼 폰트 크기
 * @param {string} [props.textColor] - 버튼 폰트 색상
 * @param {string} [props.bgColor] - 버튼 색상
 * @param {string} [props.border] - 버튼 border 설정
 * @param {string} [props.hoverTextColor] - hover시 버튼 폰트 색상
 * @param {string} [props.hoverBgColor] - hover시 버튼 색상
 * @param {string} [props.hoverBorder] - hover시 버튼 border 설정
 * @param {string} [props.borderRadius] - 버튼 모서리 둥글기 설정
 * @param {string} [props.rippleColor ] - 클릭시 버튼 색상
 * @param {string} [props.padding] - 버튼 padding 설정
 * @param {React.ReactNode} props.children - 버튼 내부 요소
 * @returns {JSX.Element} 커스텀된 버튼 컴포넌트
 */
export default function CustomButton({ children, margin, fontSize, textColor, bgColor, border, borderRadius, hoverBgColor, hoverTextColor, hoverBorder, rippleColor , padding, ...props }) {
  return (
    <CustomStyledButton 
    margin={margin} 
    fontSize={fontSize} 
    textColor={textColor} 
    bgColor={bgColor} 
    border={border} 
    borderRadius={borderRadius} 
    hoverBgColor={hoverBgColor} 
    hoverTextColor={hoverTextColor} 
    hoverBorder={hoverBorder} 
    rippleColor ={rippleColor}
    padding={padding} 
    {...props}>
      {children}
    </CustomStyledButton>
  );
}