import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import NavbarComponent from '../../components/Navbar'
import Footer from '../../components/Footer';


const LearningMain = () => {
  const navigate = useNavigate();

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

      <Container maxWidth="lg" style={{ marginTop: "120px", marginBottom: "60px" }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          로드맵
        </Typography>

        <Box sx={{width : "232px"}}>
          <Box
            sx = {{
              backgroundColor: "#333333",
              color : "#ffffff",
              padding : "8px",
              borderRadius : 2,
              marginBottom : "16px"
            }}>
            <Typography variant="h6" fontWeight="bold" align="center">
              Title
            </Typography> 
          </Box>

          <Card 
              sx={{ 
                cursor: "pointer",
                borderRadius: 2,
                boxShadow: 3
                // "&:hover": { boxShadow: 6, transform: "translateY(-4px)", transition: "0.2s" }
              }}
            >
              <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    챕터명
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    퍼센테이지
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    박스및아이콘
                  </Typography>
                </CardContent>
            </Card>
        </Box>

      </Container>

      <Footer />
    </Container>
  );
};

export default LearningMain;