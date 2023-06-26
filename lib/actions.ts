import { ProjectForm } from '@/common.types';
import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getSingleUserProjectsQuery,
  getUserQuery,
  projectsQuery,
} from '@/graphql';

import { GraphQLClient } from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
  : 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'dev';
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_SERVER_URL || ''
  : 'http://localhost:3000';

interface CreateUser {
  id: string;
  name: string;
  image: string;
  email: string;
}

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

const createUser = async ({ id, name, image, email }: CreateUser) => {
  const variables = {
    input: {
      userId: id,
      name,
      email,
      avatarUrl: image,
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

const createProject = async (form: ProjectForm, user: any, token: string) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl?.data?.secure_url) {
    client.setHeader('Authorization', `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl?.data?.secure_url,
        createdBy: {
          link: user?.id,
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

const fetchProjectsDetailsById = async (projectId: string) => {
  try {
    const data = await makeGraphqlRequest(getProjectByIdQuery, { id: projectId });

    return data;
  } catch (error: any) {
    console.log(error);
  }
};

const getSingleUserProjects = async (userId: string, last?: number) => {
  try {
    const data = await makeGraphqlRequest(getSingleUserProjectsQuery, {
      userId,
      last,
    });

    return data;
  } catch (error: any) {
    console.log(error);
  }
};

const deleteProject = async (projectId: string, token: string) => {
  try {
    client.setHeader('Authorization', `Bearer ${token}`);
    const data = await makeGraphqlRequest(deleteProjectMutation, {
      id: projectId,
    });

    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export {
  createProject,
  createUser,
  deleteProject,
  fetchAllProjects,
  fetchProjectsDetailsById,
  fetchToken,
  getSingleUserProjects,
  getUser,
};
