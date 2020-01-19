const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
}

type User {
  _id: ID!
  email: String!
  password: String  
}

type Project {
  _id: ID!
  name: String!
  file: String!
  xp: String!
  description: String!
  linkToPrior: String!
  minimumLevelRequired: [Int]
  placeOnTheMap: String!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input EventInput { 
  title: String!
  description: String!
  price: Float!
  date: String!
}

input UserInput {
  email: String!
  password: String!
}

input ProjectInput {
  name: String!
  file: String!
  xp: String!
  description: String!
  linkToPrior: String!
  minimumLevelRequired: [Int]
  placeOnTheMap: String!
}

type RootQuery {
  events: [Event!]!
  users: [User!]!
  login(email: String!, password: String!): AuthData!
  projects: [Project!]!
}

type RootMutation {
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
  createProject(projectInput: ProjectInput): Project
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`)
