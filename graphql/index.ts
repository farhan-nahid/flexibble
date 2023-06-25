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

export { createProjectMutation, createUserMutation, getUserQuery };
