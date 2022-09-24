## Lens Protocol bounty integration

Github URL :

==> https://github.com/jaydippatel83/superfun_lens_demo/blob/master/src/LensProtocol/services/Apollo_Client.js

==> https://github.com/jaydippatel83/superfun_lens_demo/blob/master/src/LensProtocol/post/create-post.js

=> https://github.com/jaydippatel83/superfun_lens_demo/blob/master/src/LensProtocol/post/explore/explore-publications.js

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
