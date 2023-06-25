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

export { createUserMutation, getUserQuery };
