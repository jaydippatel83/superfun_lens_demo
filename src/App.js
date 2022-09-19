
import './App.css';
import ArtistSlider from './components/ArtistSlider';
import TrendingSlider from './components/TrendingSlider'; 
import Header from './header/Header';
import Stories from './components/Stories';
import TopCreators from './components/TopCreators';
import Search from './components/Search';
import { useEffect } from 'react';

function App() {


  // useEffect(() => {
  //   const connectorId = window.localStorage.getItem("connectorId");
  //   if (!window.ethereum) {
  //     enableWeb3({ provider: connectorId });
  //   }
  // }, [connectorId]);

  // asks the user for permission to change network to polygon mumbain testnet if other network is detected
  useEffect(() => {
    if (window.ethereum) {
      (async () => {
        await window.ethereum.request({
          id: 1,
          jsonrpc: "2.0",
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881",
              rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
              chainName: "Polygon Testnet Mumbai",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC", // 2-6 characters long
                decimals: 18,
              },
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            },
          ],
        });
      })();
    }
  }, []);


  return (
    <>
      <Header />
      <TopCreators/>
      <Search/>
      <TrendingSlider/>
      {/* <ArtistSlider/>  */}
      <Stories/>
    </>
  );
}

export default App;
