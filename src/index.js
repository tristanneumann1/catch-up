import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'firebaseui/dist/firebaseui.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Maven Pro',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif'
    ].join(',')
  },
  palette: {
    primary: {
      main: "#641F5E"
    },
    secondary: {
      main: "#C2C092"
    },
    white: {
      main: '#fff'
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

reportWebVitals();
