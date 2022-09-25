
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