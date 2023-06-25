import { ProjectForm } from '@/common.types';
import {
  createProjectMutation,
  createUserMutation,
  getUserQuery,
  projectsQuery,
} from '@/graphql';
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

const getUser = async (email: string) => {
  try {
    const data = await makeGraphqlRequest(getUserQuery, { email });
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

const createUser = async (name: string, email: string, avatarUrl: string) => {
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

const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
};

const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
};

const createProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl?.url) {
    client.setHeader('Authorization', `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        imageUrl: imageUrl.url,
        creator: {
          link: creatorId,
        },
      },
    };

    return makeGraphqlRequest(createProjectMutation, variables);
  }
};

const fetchAllProjects = async (category?: string, endCursor?: string) => {
  const variables = {
    category,
    endCursor,
  };

  try {
    const data = await makeGraphqlRequest(projectsQuery, variables);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export { createProject, createUser, fetchToken, getUser, fetchAllProjects };
