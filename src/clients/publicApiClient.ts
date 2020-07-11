import fetch from 'node-fetch';
import {gql, InMemoryCache, QueryOptions} from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

import auth from "../auth/auth";
import config from "../config";
import {
  FinancialMovementsProjection, IncomeType, Occurrences,
  ProjectionPoint
} from "../components/domain/IncomeManagement/types";

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

export const GET_FINANCIAL_CONTRACTS_QUERY = gql`
query($page: Int!, $pageSize: Int!) {
  getIncomeResumes(page: $page, pageSize: $pageSize) {
    id
    name
    yearlyGrossIncome {
      amount: valueInCents
      currency
    }
    yearlyNetIncome {
      amount: valueInCents
      currency
    }
    yearlyIncomeDiscount {
      amount: valueInCents
      currency
    }
  }
}
`;

export const GET_PROJECTIONS_QUERY = gql`
query($page: Int!, $pageSize: Int!) {
  getIncomeProjections(page: $page, pageSize: $pageSize) {
    label
    currency
    financialMovements {
      amount {
        amount: valueInCents
        currency
      }
      dateTime
    }
  }
}
`;

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

export const getIncomeResumes = (page: number, pageSize: number) => {
  type Variables = {
    page: number;
    pageSize: number;
  }
  const variables = {
    page,
    pageSize,
  } as Variables;

  return apolloClient
    .query({
      query: GET_FINANCIAL_CONTRACTS_QUERY,
      variables
    } as QueryOptions<Variables>)
    .then(result => result.data.getIncomeResumes);
};

export const getIncomeProjections = (page: number = 1, pageSize: number = 100) => {
  type Variables = {
    page: number;
    pageSize: number;
  }
  const variables = {
    page,
    pageSize,
  } as Variables;

  return apolloClient
    .query({
      query: GET_PROJECTIONS_QUERY,
      variables
    } as QueryOptions<Variables>)
    .then(result => result.data.getIncomeProjections.map((projection: FinancialMovementsProjection) => ({
      ...projection,
      financialMovements: projection.financialMovements.map((point : ProjectionPoint) => ({
        ...point,
        dateTime: new Date(point.dateTime.toString()),
      })),
    })));
};
