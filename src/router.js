// router.js

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx";
import Report from "./pages/learning/report/Report.jsx";
import Chat from "./pages/learning/chat/Chat.jsx";
import Article from "./pages/article/Article.jsx";
import ArticleDetail from "./pages/article/ArticleDetail.jsx";
import { PATH } from "./config/paths";

const RouterConfig = () => {
  return (
    <Routes>      
      <Route index element={<Navigate to={PATH.MAIN} replace />} />
      <Route path={PATH.ROOT} element={<Navigate to={PATH.MAIN} />} />
      <Route path={PATH.MAIN} element={<Home />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.JOIN} element={<Join />} />
      <Route path={PATH.LEARNING_REPORT} element={<Report />} />
      <Route path={PATH.LEARNING_CHAT} element={<Chat />} />
      <Route path={PATH.ARTICLE} element={<Article />} />
      <Route path={PATH.ARTICLE_DETAIL} element={<ArticleDetail />} />
    </Routes>
  );
};

export default RouterConfig;