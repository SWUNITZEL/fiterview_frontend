/**
 * @file PostUploadContents.jsx
 * @description AI 모의면접 페이지/문서 업로드 후 콘텐츠 (과목별 평균 추가)
 * @author 이찬우
 * @created 2025-05-07
 **/

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
  Button
} from '@mui/material';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  // Legend,
  Line,
} from "recharts";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { useGradeStats } from "../../hooks/useGradeStats";
import { PostUploadContentsPropTypes } from "../../types/props";
import { SUBJECT, CRITERIONS } from "../../data/schoolRecords";

import './AIMock.css';

const CustomCell = styled(TableCell)(() => ({
  border: 'none',
  padding: '4px 10px',
  textAlign: 'center',
}));

const PostUploadContents = ({ userName, result, navigate }) => {
  /**
   * @const result 값 세분화 및 null-safe 처리
   * */
  const grades = result.grades || {};
  const typeWords = result.type.trim().split(' ');
  const typeLastWord = typeWords.pop();
  const typeFirstPart = typeWords.join(' ');
  const hashtags = result.hashtags || [];
  const explanation = result.explanation || {};
  const recommendedMajor = result.recommendedMajor || [];
  const advice = result.advice || "";

  const {
    categories,
    selectedCategories,
    mergedData,
    searched,
    selectedStats,
    overallAvg,
    overallMin,
    overallMax,
    handleCategoryToggle,
    handleSearch,
  } = useGradeStats(grades);


  return (
    <Container maxWidth={false} style={{
      backgroundColor: "var(--background-color)",
      width:"100%",
      padding: "120px 240px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent:"center",
      alignItems:"center"
    }}>
          <h3 style={{marginTop:"0", marginBottom:"0", color:"var(--nuetral-70)", fontSize:"18px", fontWeight:"500"}}>
            {userName}님의 생활기록부를 분석해보았어요!
          </h3>
          <h1 style={{marginTop:"0", marginBottom:"0", color:"var(--primary-60)", fontSize:"32px", padding:"0"}}>{userName}님의 전체 성적 추이</h1>
          {/* 과목 선택 버튼 */}
          <div className="category-buttons child-row-center" style={{margin:"24px 0px 36px 0px"}}>
            {categories.map((category) => (
              <button
                key={category}
                className={selectedCategories.includes(category) ? "active" : ""}
                onClick={() => handleCategoryToggle(category)}
              >
                {SUBJECT[category] || category}
              </button>
            ))}
          </div>
          

          <div style={{
            width:"100%",
            height:"calc(300px + 110px)",
            padding:"55px 64px",
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-around",
            border:"1px solid var(--nuetral-40)",
            borderRadius:"16px",
            }} >
            <LineChart width={600} height={300} data={mergedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis reversed domain={[1, 9]} />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="pv"
                stroke="var(--primary-60)"
                name="전체 성적"
                dot={{ r: 4 }}
                activeDot={{
                  r: 4,
                  stroke: "var(--primary-60)",
                  strokeWidth: 3,
                  fill: "var(--nuetral-10)",
                }}
              />
              {searched && (
                <Line
                  type="monotone"
                  dataKey="선택과목 평균"
                  stroke="var(--secondary-40)"
                  name="선택 과목 평균"
                  dot={{ r: 4 }}
                  activeDot={{
                    r: 4,
                    stroke: "var(--secondary-40)",
                    strokeWidth: 3,
                    fill: "var(--nuetral-10)",
                  }}
                />
              )}
            </LineChart>
            <div style={{display:"flex", flexDirection:"column", height:"100%", position:"relative"}}>
              <TableContainer  sx={{ display: 'inline-block', margin: '0', maxWidth: '400px' }}>
                <Table size="small" sx={{ border: 'none' }}>
                  <TableBody >
                    <TableRow>
                      <CustomCell  align="center">전체 평균</CustomCell>
                      <CustomCell  align="center">최저 등급</CustomCell>
                      <CustomCell  align="center">최고 등급</CustomCell>
                    </TableRow>
                    <TableRow>
                      <CustomCell  align="center" sx={{fontSize:"24px", fontWeight:"700", color:"var(--primary-60)"}}>
                        {overallAvg}
                      </CustomCell >
                      <CustomCell  align="center" sx={{fontSize:"24px", fontWeight:"700", color:"var(--primary-60)"}}>
                        {overallMax}
                      </CustomCell >
                      <CustomCell  align="center" sx={{fontSize:"24px", fontWeight:"700", color:"var(--primary-60)"}}>
                        {overallMin}
                      </CustomCell >
                    </TableRow>
                    {searched &&
                      <>
                        <TableRow>
                          <CustomCell  align="center">선택 평균</CustomCell >
                          <CustomCell  align="center">최저 등급</CustomCell >
                          <CustomCell  align="center">최고 등급</CustomCell >
                        </TableRow>
                        <TableRow>
                          <CustomCell  align="center" sx={{fontSize:"24px", fontWeight:"700", color:"var(--secondary-40)"}}>
                            {selectedStats.avg ?? '-'}
                          </CustomCell >
                          <CustomCell  align="center" sx={{fontSize:"24px", fontWeight:"700", color:"var(--secondary-40)"}}>
                            {selectedStats.max ?? '-'}
                          </CustomCell >
                          <CustomCell  align="center" sx={{fontSize:"24px", fontWeight:"700", color:"var(--secondary-40)"}}>
                            {selectedStats.min ?? '-'}
                          </CustomCell >
                        </TableRow>
                      </>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                onClick={handleSearch}
                sx={{
                  width:"200px",
                  marginLeft:"calc(50% - 100px)",
                  position:"absolute",
                  bottom:"0",
                  height: '40px',
                  borderRadius: '8px',
                  fontSize: "16px",
                  backgroundColor: 'var(--primary-60)',
                  color: 'var(--nuetral-10)',
                  '&:hover': {
                    backgroundColor: 'var(--primary-80)',
                  }
                }}
              >
                검색
              </Button>
            </div>
          </div>          

          <h3 style={{marginTop:"120px", marginBottom:"0", color:"var(--nuetral-70)", fontSize:"18px", fontWeight:"500"}}>
            {userName}님의 생활기록부 유형
          </h3>
          <h1 style={{marginTop:"0", marginBottom:"0", fontSize:"32px", padding:"0"}}>
            {typeFirstPart} <span style={{ color: 'var(--primary-60)' }}>{typeLastWord}</span>
          </h1>
          <h4 style={{marginTop:"16px", marginBottom:"0", color:"var(--primary-40)", fontSize:"20px", fontWeight:"600"}}>{hashtags.join(" ")}</h4>
          <div style={{
            width: "100%", 
            height:"70%", 
            marginTop:"24px",
            borderRadius:"8px", 
            background:"var(--primary-10)",
            padding:"16px",
            fontSize:"18px",
            fontWeight:"400",
            color:"var(--primary-60)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
            }}>
              <CheckCircleIcon style={{height:"20px", color:"var(--primary-60)", marginRight:"4px"}} />
              추천학과: {recommendedMajor.join(", ")}
          </div>
          <p style={{marginTop:"48px", marginBottom:"0", fontSize:"18px", fontWeight:"400", wordBreak: "keep-all"}}>{explanation}</p>
          {advice!=="" &&
          <p style={{marginTop:"24px", marginBottom:"0", fontSize:"18px", fontWeight:"400", wordBreak: "keep-all"}}>{advice}</p>
          }
          
          <div style={{
            width: "100%", 
            height:"70%", 
            marginTop:"96px",
            marginBottom:"24px",
            borderRadius:"8px", 
            background:"var(--nuetral-30)",
            padding:"16px",
            fontSize:"18px",
            fontWeight:"400",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
            }}>
              <CheckCircleIcon style={{height:"20px", color:"var(--success-40)", marginRight:"4px"}} />
              학생부종합전형은 학업역량, 진로역량, 공동체역량의 3대 역량을 학교생활기록부를 통해 평가합니다
          </div>
          <div style={{ display:"flex", flexDirection:"row", justifyContent: "space-around", gap: "16px", width:"100%" }}>
            <div className='criterion-card'>
              <img src='/images/ai_mock/criterion/icon01.png' style={{height:"120px", marginBottom:"28px"}} alt='icon'></img>
              <h4 style={{marginTop:"0", marginBottom:"0", fontSize:"18px", fontWeight:"600"}}>학업역량</h4>
              <span style={{marginTop:"16px", marginBottom:"0", fontSize:"16px", fontWeight:"400", wordBreak: "keep-all",textAlign: "center", color:"var(--nuetral-70)"}}>
                {CRITERIONS.ACADEMIC_COMPETENCY}
              </span>
            </div>
            <div className='criterion-card'>
              <img src='/images/ai_mock/criterion/icon02.png' style={{height:"120px", marginBottom:"28px"}} alt='icon'></img>
              <h4 style={{marginTop:"0", marginBottom:"0", fontSize:"18px", fontWeight:"600"}}>진로역량</h4>
              <span style={{marginTop:"16px", marginBottom:"0", fontSize:"16px", fontWeight:"400", wordBreak: "keep-all",textAlign: "center", color:"var(--nuetral-70)"}}>
                {CRITERIONS.CAREER_COMPETENCY}
              </span>
            </div>
            <div className='criterion-card'>
              <img src='/images/ai_mock/criterion/icon03.png' style={{height:"120px", marginBottom:"28px"}} alt='icon'></img>
              <h4 style={{marginTop:"0", marginBottom:"0", fontSize:"18px", fontWeight:"600"}}>공동체역량</h4>
              <span style={{marginTop:"16px", marginBottom:"0", fontSize:"16px", fontWeight:"400", wordBreak: "keep-all",textAlign: "center", color:"var(--nuetral-70)"}}>
                {CRITERIONS.COMMUNITY_COMPETENCY}
              </span>
            </div>
          </div>
          <Button
            onClick={() => {navigate()}}
            sx={{
              marginTop:"120px",
              height: '56px',
              width:"300px",
              borderRadius: '8px',
              fontSize: "18px",
              backgroundColor: 'var(--primary-60)',
              color: 'var(--nuetral-10)',
              '&:hover': {
                backgroundColor:'var(--primary-80)',
              }
            }}
          >
            모의면접 하러가기
          </Button>
    </Container>
  );
};

PostUploadContents.propTypes = PostUploadContentsPropTypes;

export default PostUploadContents;
