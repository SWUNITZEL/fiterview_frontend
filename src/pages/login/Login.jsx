import React from 'react';
import { Container } from "@mui/material";
import NavbarComponent from '../../components/Navbar'
import styles from "./Login.module.css";

const Login = () => {
  return (
    <Container maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0px 0",
      }}
    >
      <NavbarComponent />
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>로그인</h1>
          <form>
            <input
              type="email"
              placeholder="이메일"
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              로그인
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
