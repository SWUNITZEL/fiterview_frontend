import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router";
import MuiTheme from './components/MuiTheme';

const cache = createCache({ key: 'css', prepend: true });

function App() {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={MuiTheme}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;