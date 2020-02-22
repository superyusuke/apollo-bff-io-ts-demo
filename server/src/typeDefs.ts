import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    friendsOK: [Friend!]!
    friendsDame: [Friend!]!
  }

  type Friend {
    name: String!
    hobby: String!
  }
`;
