## Polygon Bounty integration

#deploy contract on polygon Mumbai Testnet :

=> LENS_PERIPHERY_CONTRACT = "0xD5037d72877808cdE7F669563e9389930AF404E8";

=> LENS_HUB_CONTRACT_ADDRESS = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82";

Github URL => https://github.com/jaydippatel83/superfun_lens_demo/blob/master/src/LensProtocol/services/Apollo_Client.js


```javascript 

import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'

const APIURL = 'https://api-mumbai.lens.dev/'
// const APIURL = 'https://api.lens.dev';

const httpLink = new HttpLink({ uri: APIURL }); 
const authLink = new ApolloLink((operation, forward) => { 
  const token = localStorage.getItem('accessToken'); 
  operation.setContext({
    headers: {
      'x-access-token': token ? `Bearer ${token}` : ''
    }
  }); 
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  onError: ({ networkError, graphQLErrors }) => { 
    console.log('networkError', networkError)
  },
  cache: new InMemoryCache(),
}) 

```
