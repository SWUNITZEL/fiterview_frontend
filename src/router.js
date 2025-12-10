// router.js

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx";
import { PATH } from "./config/paths";

const RouterConfig = () => {
  return (
    <Routes>      
      <Route path={PATH.ROOT} element={<Navigate to={PATH.MAIN} />} />
      <Route path={PATH.MAIN} element={<Home />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.JOIN} element={<Join />} />
    </Routes>
  );
};

export default RouterConfig;