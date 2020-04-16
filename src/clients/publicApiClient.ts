import { gql, InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import auth from "../auth/auth";
import config from "../config";

const httpLink = createHttpLink({
  uri: config.apiUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export interface UserProfile {
  id: string;
  firstName: string;
  email: string;
  picture: string;
}

export const getUserProfile: () => Promise<UserProfile> = () => {
  return client
    .query({
      query: gql`
      {
        userProfile {
          id
          firstName
          email
          picture
        }
      }
    `
    })
    .then(result => result.data.userProfile);
};
