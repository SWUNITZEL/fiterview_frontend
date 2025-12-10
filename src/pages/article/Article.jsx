import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import NavbarComponent from '../../components/Navbar'
import { PATH } from "../../config/paths";
import Footer from '../../components/Footer';

import { articleList } from "../../data/articleData";

const ReportMain = () => {
  const navigate = useNavigate();

  const handleCardClick = (articleId) => {
    navigate(`${PATH.ARTICLE}/${articleId}`);
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

      <Container maxWidth="lg" style={{ marginTop: "120px", marginBottom: "60px" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          아티클 리스트
        </Typography>

        <Grid container spacing={4}>
          {articleList.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card 
                onClick={() => handleCardClick(article.id)}
                sx={{ 
                  cursor: "pointer",
                  borderRadius: 3,
                  boxShadow: 3,
                  "&:hover": { boxShadow: 6, transform: "translateY(-4px)", transition: "0.2s" }
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={article.thumbnail}
                  alt={article.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Container>
  );
};

export default ReportMain;
