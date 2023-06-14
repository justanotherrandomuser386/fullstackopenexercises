import express from 'express'
import { createYoga } from 'graphql-yoga'
import schema from './schema.js'

const server = express()

const yoga = createYoga({ schema })

server.use(yoga.graphqlEndpoint, yoga)
server.listen(4000)
console.log('running server on port 4000')
