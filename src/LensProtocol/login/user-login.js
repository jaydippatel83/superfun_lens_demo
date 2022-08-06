import { getAddress, signText } from '../services/ethers-service';
import { generateChallenge } from './generate-challenge'
import { authenticate } from './authenticate'

export const loginSS = async () => {
  // we grab the address of the connected wallet
    const address = await getAddress();
  
  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);
  
  // sign the text with the wallet
  const signature = await signText(challengeResponse.data.challenge.text)
  
  const accessTokens = await authenticate(address, signature);
  console.log(accessTokens); 
}