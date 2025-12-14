import { Container } from "@mui/material";

export default function MainContainer({ children, sx }) {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "calc(100% - 160px)",
        minWidth: "1200px",
        my: "140px",
        mx: "80px",
        ...sx, // 필요하면 외부에서 덮어쓰기 가능
      }}
    >
      {children}
    </Container>
  );
}
