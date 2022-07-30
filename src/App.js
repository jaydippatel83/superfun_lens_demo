
import './App.css';
import ArtistSlider from './components/ArtistSlider';
import TrendingSlider from './components/TrendingSlider';
import Clips from './components/Clips';
import Header from './header/Header';
import Stories from './components/Stories';
import TopCreators from './components/TopCreators';
import Search from './components/Search';

function App() {
  return (
    <>
      <Header />
      <TopCreators/>
      <Search/>
      <TrendingSlider/>
      <ArtistSlider/>
      <Clips/>
      <Stories/>
    </>
  );
}

export default App;
