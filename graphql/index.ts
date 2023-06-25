const getUserQuery = `
    query GetUser($email: string!) {
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
    mutation CreateUser($input: CreateUserInput!) {
        userCreate(input: $input) {
            user {
                id
                name
                email
                description
                avatarUrl
                githubUrl
                linkedinUrl
            }
        }
    }
`;

const createProjectMutation = `
    mutation CreateProject($input: CreateProjectInput!) {
        projectCreate(input: $input) {
            project {
                id
                name
                description
                imageUrl
                githubUrl
                demoUrl
                creator {
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
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export { createProjectMutation, createUserMutation, getUserQuery, projectsQuery };
