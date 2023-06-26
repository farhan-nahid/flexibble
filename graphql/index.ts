const getUserQuery = `
    query GetUser($email: String!) {
        user(by: { email: $email }) {
            id
            name
            email
            description
            avatarUrl
            githubUrl
            linkedinUrl
        }
    }
`;

const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            user {
                userId
                name
                email
                avatarUrl
                description
                githubUrl
                linkedinUrl
            }
        }
    }
`;

const createProjectMutation = `
    mutation CreateProject($input: ProjectCreateInput!) {
        projectCreate(input: $input) {
            project {
                id
                title
                description
                image
                githubUrl
                liveSiteUrl
                createdBy {
                    name
                    email
                }
            }
        }
    }
`;

const projectsQuery = `
  query getProjects($category: String, $endcursor: String) {
    projectSearch(first: 8, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            name
            email
            avatarUrl
            id
          }
        }
      }
    }
  }
`;

const getProjectByIdQuery = `
  query getProjectById($id: ID!) {
    project(by: {id: $id}) {
      title
      githubUrl
      description
      liveSiteUrl
      id
      image
      category
      createdBy {
        name
        email
        avatarUrl
        id
      }
    }
  }
`;

const updateProjectMutation = `
  mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
    projectUpdate(by: {id: $id}, input: $input) {
      project {
        title
        githubUrl
        description
        liveSiteUrl
        id
        image
        category
        createdBy {
          name
          email
          avatarUrl
          id
        }
      }
    }
  }
`;

const getSingleUserProjectsQuery = `
  query getSingleUserProjects($userId: ID!, $last: Int = 4) {
    user(by: {id: $userId}) {
      projects (first: $last) {
        edges {
          node {
            title
            githubUrl
            description
            liveSiteUrl
            id
            image
            category
            createdBy {
              name
              email
              avatarUrl
              id
            }
          }
        }
      }
    }
  }
`;

const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: {id: $id}) {
      deletedId
    }
  }
`;

export {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getSingleUserProjectsQuery,
  getUserQuery,
  projectsQuery,
  updateProjectMutation,
};
