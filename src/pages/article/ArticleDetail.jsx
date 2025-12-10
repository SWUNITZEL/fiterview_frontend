import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { articleList } from "../../data/articleData";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const article = articleList.find((a) => a.id === Number(articleId));

  if (!article) return <div>존재하지 않는 아티클입니다.</div>;

  return (
    <Container maxWidth="md" style={{ marginTop: "100px" }}>
      <Typography variant="h3" fontWeight="bold">
        {article.title}
      </Typography>

      <img 
        src={article.thumbnail}
        alt={article.title}
        style={{ width: "100%", borderRadius: "12px", marginTop: "20px" }}
      />

      <Typography variant="body1" style={{ marginTop: "20px" }}>
        {article.contents}
      </Typography>
    </Container>
  );
};

export default ArticleDetail;
