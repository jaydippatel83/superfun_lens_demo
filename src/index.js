import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme,responsiveFontSizes } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import ClipList from './components/Lists/ClipList';
import ContestList from './components/Lists/ContestList';
import StorieList from './components/Lists/StorieList';
import TrendingList from './components/Lists/TrendingList';
import Profile from './components/Profile'; 
import TrendingDetails from './components/DetailPages/TrendingDetails';
import ContestDetails from './components/DetailPages/ContestDetails';
import MemeList from './components/Lists/MemeList';
import Footer from './header/Footer';
 

let darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
  typography: {
    fontFamily: [ 
      '"Rubik"',
    ].join(','),
  },
});

darkTheme = responsiveFontSizes(darkTheme);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />  
        <Route path="/memers" element={<MemeList/>} />    
        <Route path="/trending" element={<TrendingList/>} />  
        <Route path="/clips" element={<ClipList/>} />  
        <Route path="/stories" element={<StorieList/>} />  
        <Route path="/contest" element={<ContestList/>} />  
        <Route path="/:id" element={<Profile/>} /> 
        <Route path="/trendingDetails:id" element={<TrendingDetails/>} />  
        <Route path="/contestDetails:id" element={<ContestDetails/>} />  
      </Routes>
      <Footer/>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
