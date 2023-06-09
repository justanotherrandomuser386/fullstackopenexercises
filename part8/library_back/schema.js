import { createSchema } from 'graphql-yoga'
import { randomUUID } from 'node:crypto'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import { createPubSub } from 'graphql-yoga'
import Book from './src/models/book.js'
import Author from './src/models/author.js'
import User from './src/models/user.js'
import { GraphQLError } from 'graphql'
import { arch } from 'node:os'


const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('connection error', error.message)
  })



let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first own has been implemented 
*/
const pubSub = createPubSub()

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: [String]): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  
  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({}).populate('author')
      console.log('allBooks result',result)
      if (args.author) {
        result = result.filter(b => b.author === args.author)
      }
      console.log('args.genre', args.genre)
      if (args.genre.length > 0) {
        result = result.filter(b => {return b.genres.filter(g => args.genre.includes(g)).length > 0})
      }
      return result
    },
    allAuthors: async () => await Author.find(),
    me: (root, args, context) => {
      return context.currentUser},
    
  },
  //Author: {
    //bookCount: async (root) => {
      //const books = await Book.find({}).populate('author')
      //return books.filter(b => b.author.name === root.name).length
      //console.log('root', root)
      //return root.books.length
    //}
  //},
  Mutation: {
    addBook: async (root, args, context) => {
      console.log('args', args)
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, bookCount: 0 })
        try {
          await author.save()
        } catch (error) {
            throw new GraphQLError('can author book', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args,
                error
              }
            })
          }
      }
      console.log('author', author)
      const book = new Book ({ ...args, author })
      console.log('book',book)
      try {
        await book.save()
      } catch (error) {
          throw new GraphQLError('can\'t create book', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        }
      await Author.findOneAndUpdate({ name: args.author }, {$set: { bookCount:author.bookCount + 1  }})
      context.pubSub.publish('bookAdded', { book })
      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const author = await Author.findOneAndUpdate({ name:args.name }, {$set : {born: args.setBornTo}})
      return author
    },
    createUser: async (root, args) => {
      const user = new User ({ username: args.username})
      try {
        await user.save()
      } catch(error) {
        throw new GraphQLError('can\'t creaate user', {
          extensions: {
            code: 'BAB_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
      return user
    },
    login: async (root, args) => {
      console.log('args', args)
      const user = await User.findOne({ username: args.username })
      if (!user || args.password != process.env.SECRET) {
        throw new GraphQLError('wrong credential', {
          extensions: {
            code: 'BAB_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: (root, args, context) => context.pubSub.subscribe('bookAdded'),
      resolve: (payload) => payload.book
    }
  },
}

const context = async ({ req, res }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.startsWith('Bearer ')) {
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)

    const currentUser = await User.findById(decodedToken.id)

    return { currentUser, pubSub }
  }
  return { pubSub }
}

const schema = createSchema({
  typeDefs:typeDefs,
  resolvers: resolvers
})

export default schema
export { context }
