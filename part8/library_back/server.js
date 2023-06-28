import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import schema from './schema.js'
import { context } from './schema.js'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'


const yoga = createYoga({ 
  schema,
  context,
  graphiql: {
    subscriptionsProtocol: 'WS',
  }
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
