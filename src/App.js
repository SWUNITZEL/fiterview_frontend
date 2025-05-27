import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router";
import MuiTheme from './theme';
import { UserProvider } from './contexts/UserContext'

const cache = createCache({ key: 'css', prepend: true });

function App() {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={MuiTheme}>
        <CssBaseline />
        <UserProvider>
          <Router>
            <Routes />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;