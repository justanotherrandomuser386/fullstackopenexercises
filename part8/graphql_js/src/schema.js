const typeDefinitions = `
  enum YesNo {
    YES
    NO
  }

  interface Node {
    id: ID!
  }

  type Address {
    street: String!
    city: String!
  }

  type Person implements Node {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type User implements Node {
    username: String
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    node(id: ID!): Node
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addAsFriend(
      name: String!
    ): User
  }

  type Subscription {
    personAdded: Person!
  }
`

export default typeDefinitions
