// App.js

import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter as Router } from "react-router-dom"; // HashRouter -> BrowserRouter로 변경
import RouterConfig from "./router";
import MuiTheme from './theme';
import { UserProvider } from './contexts/UserContext';

// emotion 캐시 설정
const cache = createCache({ key: 'css', prepend: true });

function App() {

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={MuiTheme}>
        <CssBaseline />
        <UserProvider>
          <Router basename="/nexture-frontend">
            <RouterConfig />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;