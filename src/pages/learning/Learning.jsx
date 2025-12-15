import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import NavbarComponent from '../../components/Navbar';
import { PATH } from "../../config/paths";
import Footer from '../../components/Footer';
import MainContainer from '../../components/MainContainer';

import { learningList } from '../../data/learningData';


const LearningMain = () => {

  const navigate = useNavigate();
  
  const handleCardClick = (titleId) => {
    navigate(`${PATH.LEARNING}/${titleId}`);
  };

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <NavbarComponent />

      <MainContainer>
        <Typography variant="h1" fontWeight={700} fontSize={"28px"} marginBottom={"16px"}>
          로드맵
        </Typography>

        <Box
          sx = {{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)"
            },
            columnGap: 3,
          }}>
          {learningList.map((column) => (
            <Box
              key={column.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              {/* 책 제목 */}
              <Box
                sx = {{
                  backgroundColor: "var(--color-blue-500)",
                  color: "#ffffff",
                  padding : "8px 16px",
                  borderRadius : "8px",
                  marginBottom : "4px",
                  height: "72px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                <Typography 
                  fontWeight={700}
                  fontSize={"18px"}
                  lineHeight={"28px"}
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    webKitBoxOrient: "vertical",
                    overflow: "hidden",
                    maxHeight: "56px"
                  }}>
                    {column.title}
                </Typography>
              </Box>

              {/* 카드 리스트 */}
              {column.items.map((item) =>
                <Card
                  onClick={
                    item.action === "학습 불가" ? undefined
                    : () => handleCardClick(column.id)
                  }

                  key={item.id}
                  sx={{ 
                    boxShadow: "none",
                    cursor: item.action === "학습 불가" ? "default" : "pointer",
                    borderRadius: 2,
                    backgroundColor: "var(--color-gray-100)",
                    ...(item.action !== "학습 불가" && {
                      "&:hover": { backgroundColor: "var(--color-gray-200)", transition: "0.2s" }
                    })
                    }}>
                    <CardContent 
                      sx = {{
                        p: 2,
                        "&:last-child": { pb: 2 }
                      }}>
                      <Typography variant="h2" fontWeight={700} fontSize={"18px"} color="var(--color-gray-900)" lineHeight="28px">
                        {item.chapter}
                      </Typography>

                      <Typography variant="body2" fontWeight={400} fontSize={"16px"} color="var(--color-blue-500)" lineHeight={"24px"} marginBottom={"4px"}>
                        {item.progress}
                      </Typography>
                    
                      <Box 
                        sx = {{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}>
                          <Typography variant="body2" fontWeight={400} fontSize={"18px"} lineHeight={"28px"} 
                          color={
                            item.action === "학습 불가" 
                            ? "var(--color-gray-400)" 
                            : "var(--color-gray-700)"
                          }>
                            {item.action}
                          </Typography>
                          <Box component="img" src="" alt="" sx = {{ width: 20, height: 20 }} />
                      </Box>
                    </CardContent>
                </Card>
              )}
            </Box>
          ))}
        </Box>

      </MainContainer>

      <Footer />
    </Container>
  );
};

export default LearningMain;