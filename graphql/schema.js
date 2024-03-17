// graphql/schema.js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    _id: ID!
    username: String!
    email: String!
    posts: [Post!]
    following: [User!]
    followers: [User!]
    isAdmin: Boolean!
    blacklisted: Boolean!
  }

  type Post {
    _id: ID!
    content: String!
    author: User!
    createdAt: String!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
    feed: [Post!]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): String!
    login(email: String!, password: String!): String!
    postContent(content: String!): String!
    followUser(userId: ID!): String!
    unfollowUser(userId: ID!): String!
  }
`);

module.exports = schema;
