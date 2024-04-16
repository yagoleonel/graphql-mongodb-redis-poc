export const UserTypeDef = `
  type User {
    id: ID!
    name: String!,
    email: String
  }

  input UserFilter {
    name: String,
    email: String
  }

  type Query {
    users(filter: UserFilter): [User]
  }
`;
