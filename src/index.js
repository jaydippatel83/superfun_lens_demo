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
import TopCreatorsDetail from './components/Lists/TopCreatorsList'; 
import ClipList from './components/Lists/ClipList';
import ContestList from './components/Lists/ContestList';
import StorieList from './components/Lists/StorieList';
import TrendingList from './components/Lists/TrendingList';

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
        <Route path="/memers" element={<TopCreatorsDetail/>} />  
        <Route path="/trending" element={<TrendingList/>} />  
        <Route path="/clips" element={<ClipList/>} />  
        <Route path="/stories" element={<StorieList/>} />  
        <Route path="/contest" element={<ContestList/>} />  
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
