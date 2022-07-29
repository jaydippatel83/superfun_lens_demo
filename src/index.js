import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />  
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
