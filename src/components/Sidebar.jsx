import { Box, Typography, Collapse } from "@mui/material";
import { useState } from "react";

function SideBar(){  
  const [listOpen, setListOpen] = useState(true);

  const Section = ({title, children, collapsible = false, open, onToggle}) => (

    <Box sx={{ mb: 5 }}>
      {title &&(
        <Box
          onClick={collapsible ? onToggle : undefined}
          sx={{
            cursor: collapsible ? "pointer" : "default"
          }}>
            <Typography variant="h6" fontWeight={700} fontSize={"20px"} lineHeight={"30px"}
              sx={{ mb: 1 }}>
              {title}
            </Typography>
        </Box>
      )}

      {collapsible ? (
        <Collapse in={open}>
          <Box sx={{display: "flex", flexDirection: "column"}}>
            {children}
          </Box>
        </Collapse>
      ) : (
        <Box sx={{display: "flex", flexDirection: "column"}}>
          {children}
        </Box>
      )}
    </Box>
  );

  const MenuItem = ({children, active = false, indent = false}) => (
    <Box
      sx={{
        padding: "8px",
        mr: "16px",
        paddingLeft: indent ? "24px" : "8px",
        fontSize: "18px",
        lineHeight: "28px",
        fontWeight : active ? 700 : 400,
        borderRadius: 1,
        color : active ? "var(--color-gray-800)" : "var(--color-gray-700)",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "var(--color-gray-200)",
        },
      }}>
        {children}
    </Box>
  );

  return (       
    <Box 
      sx={{
        width: "240px",
        padding: "40px 24px",
        pr: "8px",
        bgcolor: "var(--color-gray-100)",
        borderRadius: 5,
      }}>

        <Box 
          sx={{
            height: "100%",       
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: "8px",
            },

            /* 화살표 제거 */
            "&::-webkit-scrollbar-button": {
              display: "none",
            },

            /* 배경 */
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },

            /* 손잡이 */
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--color-gray-200)",
              borderRadius: "8px",
            },

            /* 손잡이 호버링 */
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "var(--color-gray-300)",
            }
        }}>

          {/* 상단 */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h6" fontWeight={700} fontSize={"20px"} lineHeight={"30px"}
              sx={{ mb: "4px" }}>
              『책 제목』
            </Typography>
            <Typography variant="body2" fontWeight={400} fontSize={"14px"} lineHeight={"22px"}>
              - 진행 중인 파트명
            </Typography>
          </Box>

          {/* 목록 */}
          <Section 
            title="목록" 
            collapsible
            open={listOpen}
            onToggle={()=> setListOpen(prev => !prev)}
          >
            <MenuItem>1주차(00.00 - 00)</MenuItem>
            <MenuItem>2주차(00.00 - 00)</MenuItem>
            <MenuItem active>3주차(00.00 - 00)</MenuItem>
          </Section>

          {/* 독서 토론 */}
          <Section title="독서 토론">
            <MenuItem active>줄거리</MenuItem>
            <MenuItem>대화하기</MenuItem>
            <MenuItem indent>첫 번째 질문</MenuItem>
            <MenuItem indent>두 번째 질문</MenuItem>
            <MenuItem indent>세 번째 질문</MenuItem>
          </Section>

          {/* 감상문 */}
          <Section title="감상문 쓰기">
            <MenuItem>줄거리</MenuItem>
            <MenuItem>느낀점</MenuItem>
            <MenuItem>토론 소감</MenuItem>
          </Section>

          <Section title="">
            <MenuItem>보고서 확인</MenuItem>
          </Section>
        </Box>
    </Box>
  );
}

export default SideBar;