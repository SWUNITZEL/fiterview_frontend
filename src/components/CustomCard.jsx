/**
 * @file CustomCard.jsx
 * @description 모의면접 실행 페이지 - 서비스 인트로
 * @author 이찬우
 * @created 2025-04-04
 * @lastModified 2025-04-04
**/
import React from 'react';
import { Card } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * NeumorphicCardHover
 *
 * @description
 * 뉴모피즘 MUI 카드 컴포넌트로 hover, active 애니메이션 추가
 * 
 * @component
 * @example
 * return (
 *   <NeumorphicCardHover>
 *     <Typography variant="body1">Interactive Neumorphic Card</Typography>
 *   </NeumorphicCardHover>
 * )
 *
 * @param {object} props - React props
 * @param {React.ReactNode} props.children - The content inside the card
 * @param {object} [props.sx] - Optional MUI sx style overrides
 * @param {object} [props.rest] - Any other Card props
 * @returns {JSX.Element} A hoverable neumorphic-styled card
 */
export function NeumorphicCardHover({ children, sx = {}, ...rest }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '20px',
        background: 'var(--background-color)',
        boxShadow: `
          0px 0px 15px var(--background-color-shadow),
          0px 0px 15px var(--background-color-light)
        `,
        transition: 'all 0.2s ease-in-out',
        padding: 2,
        '&:hover': {
          transform: 'scale(0.99)',
          boxShadow: `
            inset 0px 4px 10px var(--background-color-shadow),
            inset 0px 0px 10px var(--background-color-light)
          `,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Card>
  );
}

NeumorphicCardHover.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};
