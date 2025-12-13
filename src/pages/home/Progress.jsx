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
  Stack
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
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Progress({ user, onNavigate }) {
  const data = {
    labels: ["분류", "분류", "분류", "분류"],
    datasets: [
      {
        data: [70, 60, 40, 65], // 점수
        backgroundColor: "rgba(58, 152, 245, 0.4)", // 내부 채움: --color-blue-400
        borderColor: "rgb(58, 152, 245)", // 외곽선: --color-blue-400"
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

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Box
            sx={{
              width: 160,
              height: 236,
              bgcolor: "var(--color-gray-300)",
              borderRadius: 2,
              flexShrink: 0
            }}
          />

          <Box flex={1} sx={{ position: "relative", mt: "12px", width: "100%" }}>
            <Typography fontWeight={700} fontSize={"24px"}>
              1주차
            </Typography>
            <Typography sx={{ mt: 2 }} fontWeight={700} fontSize={"20px"}>
              "책 제목 제목"
            </Typography>

            <Box sx={{ position: "absolute", width: "100%", bottom: 12 }}>
              <Typography fontWeight={700} fontSize={"16px"}>
                <span style={{fontWeight: "400"}}>학습률 </span>0%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={10}
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
                onClick={() => onNavigate("curriculum")}
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
                onClick={() => onNavigate("study")}
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
        border: "1px solid var(--color-gray-200)",
        bgcolor: "var(--color-base-000)"
      }}
      >
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
              지난 4주 결과물을 텍스트 형태로 평가합니다. 문장은 간결하게 3문장 정도로 작성합니다.
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
              <TableCell align="center">기간</TableCell>
              <TableCell align="center" sx={{width: 500}}>파트명</TableCell>
              <TableCell align="center">보고서</TableCell>
              <TableCell align="center">진도</TableCell>
              <TableCell align="center">학습</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4, 5].map((row) => (
              <TableRow key={row}>
                <TableCell align="center">{row}</TableCell>
                <TableCell align="center">12/01 - 12/07</TableCell>
                <TableCell>책 이름 - 파트 명 작성</TableCell>
                <TableCell align="center">
                  <Button 
                  size="small"
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
                <TableCell align="center">0%</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant={"outlined"}
                    disabled={row < 3}
                    sx={{ 
                      px: '35.5px',
                      py: '12px',
                      fontSize: '14px',
                      fontWeight: 700,
                      minHeight: '32px',
                      borderRadius: '8px',
                      "&.Mui-disabled": {
                        borderColor: row === 1 ? 'var(--color-blue-200)' : 'var(--color-gray-200)',
                        color: row === 1 ? 'var(--color-blue-500)' : 'var(--color-gray-400)',
                        backgroundColor: row === 1 ? 'var(--color-blue-050)' : 'var(--color-gray-200)',
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
                    {row === 1 ? "수강완료" : row === 2 ? "수강불가" : "수강하기"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
}


