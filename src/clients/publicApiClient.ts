import fetch from 'node-fetch';
import {gql, InMemoryCache} from 'apollo-boost';
import ApolloClient from 'apollo-client';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';

import auth from "../auth/auth";
import config from "../config";

// @ts-ignore
const httpLink = createHttpLink({
  uri: config.apiUrl, fetch,
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

export const apolloClient = new ApolloClient({
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
  return apolloClient
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

export const importAuth0User: () => Promise<UserProfile> = async () => {
  return apolloClient
    .mutate({
      mutation: gql`
      mutation importAuth0User {
        importAuth0User {
          id
        }
      }
    `
    })
    .then(result => result.data.baseCLTContract);
};

