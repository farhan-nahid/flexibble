import { createUserMutation, getUserQuery } from '@/graphql';
import { GraphQLClient } from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
  : 'http://localhost:3000/api/graphql';

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'dev';
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_SERVER_URL || ''
  : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphqlRequest = async (query: string, variables?: any) => {
  try {
    client.setHeader('x-api-key', apiKey);
    const data = await client.request(query, variables);
    return data;
  } catch (error: any) {
    console.log(error.message);
    // throw new Error(error);
  }
};

export const getUser = async (email: string) => {
  try {
    const data = await makeGraphqlRequest(getUserQuery, { email });
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createUser = async (name: string, email: string, avatarUrl: string) => {
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };

  try {
    const data = await makeGraphqlRequest(createUserMutation, variables);
    return data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
};
