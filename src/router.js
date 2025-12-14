// router.js

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx";
import Article from "./pages/article/Article.jsx";
import ArticleDetail from "./pages/article/ArticleDetail.jsx";
import Learning from "./pages/learning/Learning.jsx";
import { PATH } from "./config/paths";

const RouterConfig = () => {
  return (
    <Routes>      
      <Route path={PATH.ROOT} element={<Navigate to={PATH.MAIN} />} />
      <Route path={PATH.MAIN} element={<Home />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.JOIN} element={<Join />} />
      <Route path={PATH.ARTICLE} element={<Article />} />
      <Route path={PATH.ARTICLE_DETAIL} element={<ArticleDetail />} />
      <Route path={PATH.LEARNING} element={<Learning />} />
    </Routes>
  );
};

export default RouterConfig;