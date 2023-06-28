import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import resolvers from './src/resolvers.js'
import typeDefinitions from './src/schema.js'
import { pubSub } from './src/pubsub.js'



import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

import User from './src/models/user.js'
import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('connection error', error.message)
  })

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


const schema = createSchema({
  resolvers: resolvers, 
  typeDefs: typeDefinitions
})

const context = async ({ req, res }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.startsWith('Bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring(7), process.env.JWT_SECRET
    )

    const currentUser = await User.findById(decodedToken.id).populate('friends')
    return { currentUser, pubSub }
  }
    return { pubSub }
}
const yoga = createYoga({ 
  schema,
  context,
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
})

const server = createServer(yoga)
const wsServer = new WebSocketServer({
  server: server,
  path: yoga.graphqlEndpoint
})

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload
        })
 
      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe
        }
      }
 
      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    }
  },
  wsServer
)


server.listen(4000, () => {
  console.log('Running a GraphQL Yoga server at http://localhost:4000')
}) 
