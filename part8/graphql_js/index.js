import { createSchema, createYoga } from 'graphql-yoga'
import { randomUUID } from 'node:crypto'
import { createServer } from 'node:http'
import { GraphQLError } from 'graphql'

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

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

  type Query {
    node(id: ID!): Node
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
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
  }
`

const resolvers = {
  Query: {
    node: (root, args) => persons.find(person => person.id === args.id),
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons
      }
      const byPhone = (peson) =>
        args.phone === 'YES' ? peson.phone : !person.phone
      return persons.filter(byPhone)
    },
    findPerson: (root, args) => {
      console.log(args)
      return persons.find(p => p.name === args.name)
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
      const person = { ...args, id: randomUUID() }
      persons = persons.concat(person)
      console.log('addPerson', persons)
      return person
    },
    editNumber: (root, args) => {
      const person = persons.find(p => p.name === args.name)
      if (!person) {
        return null
      }

      const updatedPerson = { ...person, phone: args.phone }
      persons = persons.map(p => p.name === args.name ? updatedPerson : p)
      return updatedPerson
    }
  }
}

const schema = createSchema({
  resolvers: resolvers, 
  typeDefs: typeDefinitions
})

const yoga = createYoga({ schema })

const server = createServer(yoga)

server.listen(4000, () => {
  console.log('Running a GraphQL Yoga server at http://localhost:4000')
})
