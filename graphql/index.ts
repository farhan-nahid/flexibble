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

export { createProjectMutation, createUserMutation, getUserQuery, projectsQuery };
