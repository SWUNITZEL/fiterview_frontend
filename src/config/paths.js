export const PATH = {
  ROOT: "/",
  MAIN: "/main",
  LOGIN: "/login",
  JOIN: "/join",

  // 학습 페이지 (상위)
  LEARNING: "/learning",
  LEARNING_DISCUSSION: "/learning/discussion/:chatId",   // 독서토론
  LEARNING_REFLECTION: "/learning/reflection/:chatId",   // 감상문 작성
  LEARNING_REPORT: "/learning/report/:chatId",           // 보고서 보기

  // 학습 진행 현황
  PROGRESS: "/progress",

  // 아티클 페이지
  ARTICLE: "/article",
  ARTICLE_DETAIL: "/article/:articleId"
};
