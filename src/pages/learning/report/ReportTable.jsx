import {
  Box,
  Button,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import MainContainer from "../../../components/MainContainer";

export default function ReportTable() {
  const InfoTable = ({ rows }) => {
    let lastGroup = null;

    return (
        <Table sx={{ tableLayout: "fixed", width: "100%", borderColor: "var(--color-gray-400)",
            "& td": { fontSize: 16 }}}>
        <TableBody>
            {rows.map((row, idx) => {
            const isNewGroup = row.group && row.group !== lastGroup;
            if (row.group) lastGroup = row.group;

            return (
                <TableRow key={idx}>
                {/* 그룹 셀 (rowSpan) */}
                {isNewGroup && (
                    <TableCell
                    align="center"
                    rowSpan={rows.filter(r => r.group === row.group).length}
                    sx={{
                        width: 60,
                        bgcolor: "var(--color-gray-100)",
                        fontWeight: 700,
                    }}
                    >
                    {row.group}
                    </TableCell>
                )}

                {/* 일반 label */}
                <TableCell
                    align="center"
                    sx={{
                    width: 120,
                    bgcolor: "var(--color-gray-100)",
                    fontWeight: 700,
                    }}
                >
                    {row.label}
                </TableCell>

                <TableCell colSpan={row.colSpan || 1} sx={{minWidth: "100px", wordBreak: "break-word",}}>
                    {row.value}
                </TableCell>

                {row.extra && (
                    <>
                    <TableCell
                        align="center"
                        sx={{
                        width: 120,
                        bgcolor: "var(--color-gray-100)",
                        fontWeight: 700,
                        }}
                    >
                        {row.extra.label}
                    </TableCell>
                    <TableCell sx={{width: "35%", wordBreak: "break-word",}}>{row.extra.value}</TableCell>
                    </>
                )}
                </TableRow>
            );
            })}
        </TableBody>
        </Table>
    );
    };


  return (
    <MainContainer>
      {/* 헤더 */}
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography fontSize={28} fontWeight={700} sx={{ mb: 1 }}>
          책 제목 <span style={{ color: "var(--color-gray-700)", fontSize: "24px" }}>- 작가 이름</span>
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" 
          sx={{
            borderColor: 'var(--color-blue-200)',
            color: 'var(--color-blue-500)',
            backgroundColor: 'var(--color-blue-050)',
            fontWeight: 700,
            fontSize: 16,
            borderRadius: '8px',
            paddingX: "20px",
            paddingY: "10px",
            '&:hover': {
            borderColor: 'var(--color-blue-200)',
            backgroundColor: 'var(--color-blue-100)',
                      },}}>공유하기</Button>
          <Button variant="outlined" 
          sx={{
            borderColor: 'var(--color-blue-200)',
            color: 'var(--color-blue-500)',
            backgroundColor: 'var(--color-blue-050)',
            fontWeight: 700,
            fontSize: 16,
            borderRadius: '8px',
            paddingX: "20px",
            paddingY: "10px",
            '&:hover': {
            borderColor: 'var(--color-blue-200)',
            backgroundColor: 'var(--color-blue-100)',
                      },}}>내보내기</Button>
        </Stack>
      </Stack>

      {/* 최종 보고서 */}
      

      <Paper variant="outlined" sx={{ mb: 4, mx: "24px", borderColor: "transparent" }}>
        <Typography fontWeight={700} mb={2} fontSize={20} color={"var(--color-gray-600)"}>
            최종 보고서
        </Typography>
        <Paper variant="outlined" sx={{ mb: 6 }}>
            <InfoTable
            rows={[
                {
                label: "제목",
                value: "제목명 작성",
                extra: { label: "저자", value: "저자명 작성" },
                },
                {
                label: "날짜",
                value: "0000년 00월 00일",
                extra: { label: "분야", value: "분야명 작성" },
                },
                {
                label: "주제",
                value: "주제 작성",
                colSpan: 3,
                },
                {
                label: "줄거리",
                value: "AI가 작성한 줄거리 작성",
                colSpan: 3,
                },
                {
                label: "총점",
                group: "평가기준",
                value: (
                    <>
                    <Typography fontWeight={700}>0점</Typography>
                    <Typography fontSize={14} color="text.secondary">
                        평가에 대한 사유 서술로 작성되어 출력
                    </Typography>
                    </>
                ),
                colSpan: 3,
                },
                {
                    label: "표현력",
                    group: "평가기준",
                    value: "0점 / 5점",
                    colSpan: 3,
                },
                {
                    label: "사고력",
                    group: "평가기준",
                    value: "0점 / 5점",
                    colSpan: 3,
                },
                {
                    label: "학습 태도",
                    group: "평가기준",
                    value: "0점 / 5점",
                    colSpan: 3,
                },
                {
                    label: "요약 능력",
                    group: "평가기준",
                    value: "0점 / 5점",
                    colSpan: 3,
                },

            ]}
            />
        </Paper>
      

        {/* 최종 감상문 */}
        <Typography fontWeight={700} mb={2} fontSize={20} color={"var(--color-gray-600)"}>
            최종 감상문
        </Typography>
        <Paper variant="outlined">
            <InfoTable
            rows={[
                {
                label: "제목",
                value: "제목명 작성",
                extra: { label: "저자", value: "저자명 작성" },
                },
                {
                label: "날짜",
                value: "0000년 00월 00일",
                extra: { label: "분야", value: "분야명 작성" },
                },
                {
                label: "주제",
                value: "주제 작성",
                colSpan: 3,
                },
                {
                label: "줄거리",
                value: "사용자가 작성한 줄거리",
                colSpan: 3,
                },
                {
                label: "느낀점",
                value: "사용자가 작성한 책에 대한 감상",
                extra: { label: "토론", value: "사용자가 작성한 토론에 대한 감상" },
                },
            ]}
            />
        </Paper>
      </Paper>
    </MainContainer>
  );
}
