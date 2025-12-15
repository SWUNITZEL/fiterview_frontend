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
import { formatDateYMD, getCreateDate } from "../../../utils/date";

export default function ReportTable({finalReport, reflection}) {
  const InfoTable = ({ rows }) => {
  let lastGroup = null;

  return (
    <Table
      sx={{
        tableLayout: "fixed",
        width: "100%",
        "& td": { fontSize: 16 },
      }}
    >
      <TableBody>
        {rows.map((row, idx) => {
          const isNewGroup = row.group && row.group !== lastGroup;
          if (row.group) lastGroup = row.group;

          const hasGroup = !!row.group;

          return (
            <TableRow key={idx}>
              {/* group 셀 */}
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

              {/* label (group 없으면 앞 칸까지 합침) */}
              <TableCell
                align="center"
                colSpan={hasGroup ? 1 : 2}
                sx={{
                  width: 250,
                  bgcolor: "var(--color-gray-100)",
                  fontWeight: 700,
                }}
              >
                {row.label}
              </TableCell>

              {/* value */}
              <TableCell
                colSpan={row.colSpan ?? (row.extra ? 1 : 3)}
                sx={{ wordBreak: "break-word" }}
              >
                {row.value}
              </TableCell>

              {/* extra */}
              {row.extra && (
                <>
                  <TableCell
                    align="center"
                    sx={{
                      width: 250,
                      bgcolor: "var(--color-gray-100)",
                      fontWeight: 700,
                    }}
                  >
                    {row.extra.label}
                  </TableCell>
                  <TableCell sx={{ wordBreak: "break-word" }}>
                    {row.extra.value}
                  </TableCell>
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
          {finalReport.title} <span style={{ color: "var(--color-gray-700)", fontSize: "24px" }}>- {finalReport.author}</span>
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
                value: `${finalReport.title}`,
                extra: { label: "저자", value: `${finalReport.author}` },
                },
                {
                label: "날짜",
                value: `${formatDateYMD(getCreateDate(finalReport.created_at))}`,
                extra: { label: "분야", value: "문학" },
                },
                {
                label: "주제",
                value: `${finalReport.subject}`,
                colSpan: 3,
                },
                {
                label: "줄거리",
                value: `${finalReport.gold_summary}`,
                colSpan: 3,
                },
                {
                label: "총점",
                group: "평가기준",
                value: (
                    <>
                    <Typography fontWeight={700}>{finalReport.expression + finalReport.logical_thinking + finalReport.manner + finalReport.summary_accuracy}점</Typography>
                    <Typography fontSize={16} color="text.secondary">
                        {finalReport.reason}
                    </Typography>
                    </>
                ),
                colSpan: 3,
                },
                {
                    label: "표현력",
                    group: "평가기준",
                    value: `${finalReport.expression}점 / 5점`,
                    colSpan: 3,
                },
                {
                    label: "사고력",
                    group: "평가기준",
                    value: `${finalReport.logical_thinking}점 / 5점`,
                    colSpan: 3,
                },
                {
                    label: "학습 태도",
                    group: "평가기준",
                    value: `${finalReport.manner}점 / 5점`,
                    colSpan: 3,
                },
                {
                    label: "요약 능력",
                    group: "평가기준",
                    value: `${finalReport.summary_accuracy}점 / 5점`,
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
                value: `${reflection.title}`,
                extra: { label: "저자", value: `${reflection.author}` },
                },
                {
                label: "날짜",
                value: `${formatDateYMD(getCreateDate(reflection.created_at))}`,
                extra: { label: "분야", value: "문학" },
                },
                {
                label: "주제",
                value: `${reflection.subject}`,
                colSpan: 3,
                },
                {
                label: "줄거리",
                value: `${reflection.summary}`,
                colSpan: 3,
                },
                {
                label: "느낀점",
                value: `${reflection.book_review}`,
                extra: { label: "토론", value: `${reflection.debate_review}` },
                },
            ]}
            />
        </Paper>
      </Paper>
    </MainContainer>
  );
}
