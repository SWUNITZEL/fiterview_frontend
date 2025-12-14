import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Chip,
  Pagination 
} from "@mui/material";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import MainContainer from "../../components/MainContainer";
import { useProgress } from "../../hooks/useProgress";
import { formatDateYMD, getCreateDate, getExpiredDate } from "../../utils/date";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Progress({ user, onNavigate }) {
  const ROWS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const {
    chatList,
    curriculumList,
    finalReportList,
    loading,
    error,
  } = useProgress(user);
  const totalPages = Math.ceil(chatList.length / ROWS_PER_PAGE);
  const paginatedChats = chatList.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const reports = finalReportList.slice(0, 4);
  const DEFAULT_SCORES = {
    expression: 67,
    logical_thinking: 78,
    manner: 85,
    summary_accuracy: 90,
  };
  const scoreSum =
    reports.length <= 5
      ? DEFAULT_SCORES
      : reports.reduce(
        (acc, report) => {
          acc.expression += report.expression || 0;
          acc.logical_thinking += report.logical_thinking || 0;
          acc.manner += report.manner || 0;
          acc.summary_accuracy += report.summary_accuracy || 0;
          return acc;
        },
        {
          expression: 0,
          logical_thinking: 0,
          manner: 0,
          summary_accuracy: 0,
        }
    );

  const data = {
    labels: ["표현력", "사고력", "학습 태도", "요약 능력"],
    datasets: [
      {
        data: [
          scoreSum.expression,
          scoreSum.logical_thinking,
          scoreSum.manner,
          scoreSum.summary_accuracy,
        ], // 점수
        backgroundColor: "rgba(58, 152, 245, 0.4)", // 내부 채움: --color-blue-400
        borderColor: "rgb(58, 152, 245)", // 외곽선: --color-blue-400
        borderWidth: 2,
        pointRadius: 0, // 점 숨기기
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,   // 그리드 5칸
          display: false, // 숫자 숨김
        },
        grid: {
          color: "#B8C3D5", // 다각형 선: --color-gray-300
        },
        angleLines: {
          color: "#B8C3D5", // 중심에서 뻗는 선: --color-gray-300
        },
        pointLabels: {
          color: "#42464B", // 라벨 색상: --color-gray-700
          font: {
            size: 12,
            weight: "400",
          },
        },
      },
    },
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <MainContainer sx={{ px: 2 }}>

      {/* 회원 진행 현황 */}
      <Typography variant="h1" fontWeight={700} fontSize={"28px"} marginBottom={"16px"}>
        {user.name}님 진행 현황
      </Typography>
  
      <Paper 
      elevation={0} 
      sx={{ 
        py: "20px", 
        px: "24px", 
        borderRadius: 3, 
        mb: 4, 
        bgcolor: "var(--color-blue-100)" 
      }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          <Box
            sx={{
              width: 160,
              height: 236,
              backgroundImage: `url(${chatList.length > 0 ? curriculumList[`step${chatList[0].current_step}`][`${chatList[0].current_id}`].img : curriculumList.length > 0 ? curriculumList['step1']['1'].img : "준비 중입니다"})`,
              // bgcolor: "var(--color-gray-300)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
              flexShrink: 0
            }}
          />
          <Box flex={1} sx={{ position: "relative", mt: "12px", width: "100%" }}>
            {chatList.length > 0 ? 
            <Stack direction={"row"} spacing={0} sx={{ mt: "10px", mb: 2 }}>
              <Chip 
                label={`${Math.ceil((getExpiredDate(chatList[0].created_at) - new Date())/(1000 * 60 * 60 * 24))}일 남았어요`} 
                sx={{
                  bgcolor: "var(--color-blue-700)",
                  color: "var(--color-base-000)",
                  fontWeight: 500,
                  fontSize: "16px",
                  height: "28px",
                  borderRadius: "4px",
                  padding: "2px 4px",
                }}
              />
              <Chip 
                label={`${formatDateYMD(getCreateDate(chatList[0].created_at))} - ${formatDateYMD(getExpiredDate(chatList[0].created_at))}`}
                sx={{
                  bgcolor: "transparent",
                  color: "var(--color-gray-700)",
                  fontWeight: 500,
                  fontSize: "16px",
                  height: "28px",
                  borderRadius: "4px",
                  padding: "2px 0px",
                }}
                >
              </Chip>
            </Stack>
            :null}
            <Typography fontWeight={700} fontSize={"24px"}>
              『{chatList.length > 0 ? curriculumList[`step${chatList[0].current_step}`][`${chatList[0].current_id}`].title : curriculumList.length > 0 ? curriculumList['step1']['1'].title : "준비 중입니다"}』
            </Typography>
            <Typography sx={{ mt: 1 }} fontWeight={400} fontSize={"18px"}>
              {chatList.length > 0 ? curriculumList[`step${chatList[0].current_step}`][`${chatList[0].current_id}`].author : curriculumList.length > 0 ? curriculumList['step1']['1'].author : "준비 중입니다"}
            </Typography>

            <Box sx={{ position: "absolute", width: "calc(100% - 8px)", bottom: 12 }}>
              <Typography fontWeight={700} fontSize={"16px"}>
                <span style={{fontWeight: "400"}}>학습률 </span>{chatList.length > 0 ?chatList[0].has_final_report?100:chatList[0].current_question_index === null?50:chatList[0].current_question_index*25:0}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={chatList.length > 0 ?chatList[0].has_final_report?100:chatList[0].current_question_index === null?50:chatList[0].current_question_index*25:0}
                sx={{ mt: 2, height: 16, width: "100%", borderRadius: 10, 
                  backgroundColor: "var(--color-gray-100)", // 배경 바 색
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "var(--color-blue-500)", // 진행 바 색
                    borderRadius: 10,
                  }, 
                }}
              />
            </Box>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                sx = {{ 
                  height: '52px', 
                  borderColor: 'var(--color-blue-200)', 
                  backgroundColor: 'var(--color-blue-050)',
                  color: 'var(--color-blue-500)',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '18px',
                  '&:hover': {
                    borderColor: 'var(--color-blue-200)',
                    backgroundColor: 'var(--color-base-000)',
                  },}}
                onClick={() => onNavigate("/learning")}
              >
                커리큘럼 보기
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx = {{ 
                  height: '52px', 
                  borderColor: 'var(--color-blue-500)', 
                  backgroundColor: 'var(--color-blue-500)',
                  color: 'var(--color-base-000)',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '18px',
                  '&:hover': {
                    borderColor: 'var(--color-blue-400)',
                    backgroundColor: 'var(--color-blue-400)',
                  },}}
                onClick={() => onNavigate(`/learning/${chatList.length > 0 ? chatList[0].current_question_index === null? `reflection/${chatList[0].chat_id}` : `chat/${chatList[0].chat_id}`: ""}`)}
              >
                수강하기
              </Button>
            </Stack>
      </Paper>

      {/* 종합 평가 */}
      <Typography variant="h1" fontWeight={700} fontSize={"28px"} marginTop={8} marginBottom={"16px"}>
        종합 평가
      </Typography>

      <Paper 
      elevation={0}
      sx={{ 
        px: "20px",
        py: "24px", 
        borderRadius: 3, 
        position: "relative",
        border: "1px solid var(--color-gray-200)",
        bgcolor: "var(--color-base-000)"
      }}
      >
        {finalReportList.length < 4 && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              borderRadius: 3, 
              bgcolor: "rgba(0, 0, 0, 0.55)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 3,
            }}
          >
            <Typography
              fontSize="20px"
              fontWeight={700}
              color="var(--color-base-000)"
              lineHeight={1.6}
            >
              2주 이상 학습을 완료하면<br />
              종합 평가를 확인할 수 있어요
            </Typography>
          </Box>
        )}
        <Stack direction="row" spacing={3} justifyContent="space-between" height={"fit-content"}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <Typography mb={1} fontWeight={700} fontSize={"20px"} color="var(--color-blue-900)">
              좋았어요!
            </Typography>
            <Typography sx={{ marginBottom: "32px", fontSize: "18px", fontWeight: 400,  color: "var(--color-gray-800)" }}>
              지난 활동의 결과물을 텍스트 형태로 평가합니다.
            </Typography>

            <Typography mb={1} fontWeight={700} fontSize={"20px"} color="var(--color-blue-900)">
              아쉬웠어요!
            </Typography>
            <Typography sx={{ mb: 4, fontSize: "18px", fontWeight: 400, color: "var(--color-gray-800)" }}>
              부족한 점을 중심으로 구체적으로 작성합니다.
            </Typography>
            <Typography className="body-14-regular" sx={{color: "var(--color-gray-500)"}}>
              *지난 4주간의 활동을 종합적으로 평가한 결과예요.
            </Typography>
          </Box>
          <Box sx={{ width: 496, height: 344, px: "70px", py: "12px", borderRadius: "7px", bgcolor: "var(--color-gray-050)" }}>
            <Radar data={data} options={options} />
          </Box>
        </Stack>
      </Paper>

      {/* 지난 수업 */}
      <Typography variant="h1" fontWeight={700} fontSize={"28px"} marginTop={8} marginBottom={"16px"}>
        지난 수업
      </Typography>

      <Paper
      elevation={0} 
      >
        <Table
          sx={{
              tableLayout: "fixed",
              "& td": {
                borderBottom: "1px solid var(--color-gray-200)",
                fontSize: "16px",
                height: "78px",
                padding: "16px",
              },
            }}>
          <TableHead sx={{ 
            bgcolor: "var(--color-gray-100)", 
            "& th": {
                color: "var(--color-gray-600)",
                borderTop: "1px solid var(--color-gray-200)",
                borderBottom: "1px solid var(--color-gray-200)",
                fontWeight: 700,
                fontSize: "18px",
                height: "52px",
                padding: "0 12px",
              },
            }}>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center" sx={{width: 250}}>기간</TableCell>
              <TableCell align="center" sx={{width: 300}}>파트명</TableCell>
              <TableCell align="center">보고서</TableCell>
              <TableCell align="center">진도</TableCell>
              <TableCell align="center">학습</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedChats.map((chat, index) => (
              <TableRow key={chat.chat_id}>
                <TableCell align="center">{index+1}</TableCell>
                <TableCell align="center">{formatDateYMD(getCreateDate(chat.created_at))} - {formatDateYMD(getExpiredDate(chat.created_at))}</TableCell>
                <TableCell>{chat.title}</TableCell>
                <TableCell align="center">
                  <Button 
                  size="small"
                  disabled={!chat.has_final_report}
                  onClick={()=>onNavigate(`/report/${chat.chat_id}`)}
                  sx = {{
                    color: 'var(--color-gray-900)',
                    fontSize: '16px',
                    '&:hover': {
                        fontWeight: 600,
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                      },
                  }}
                  >보고서 보기</Button>
                </TableCell>
                <TableCell align="center">{chat.has_final_report?100:chat.current_question_index === null?50:chat.current_question_index*25}%</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    onClick={()=>onNavigate(`/learning/${chat.current_question_index === null?"report":"chat"}/${chat.chat_id}`)}
                    variant={"outlined"}
                    disabled={chat.has_final_report}
                    sx={{ 
                      px: '35.5px',
                      py: '12px',
                      fontSize: '14px',
                      fontWeight: 700,
                      minHeight: '32px',
                      borderRadius: '8px',
                      "&.Mui-disabled": {
                        borderColor: chat.has_final_report ? 'var(--color-blue-200)' : 'var(--color-gray-200)',
                        color: chat.has_final_report ? 'var(--color-blue-500)' : 'var(--color-gray-400)',
                        backgroundColor: chat.has_final_report ? 'var(--color-blue-050)' : 'var(--color-gray-200)',
                      },
                      borderColor: 'var(--color-blue-500)',
                      color: 'var(--color-base-000)',
                      backgroundColor: 'var(--color-blue-500)',
                      '&:hover': {
                        borderColor: 'var(--color-blue-400)',
                        backgroundColor: 'var(--color-blue-400)',
                      },
                    }}
                  >
                    {chat.has_final_report ? "수강완료" : getExpiredDate(getCreateDate(chat.created_at)) < new Date() ? "수강불가" : "수강하기"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {chatList.length > ROWS_PER_PAGE && (
          <Stack alignItems="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
            />
          </Stack>
        )}
      </Paper>
    </MainContainer>
  );
}


