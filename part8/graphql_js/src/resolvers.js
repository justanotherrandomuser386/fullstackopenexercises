import Person from './models/person.js'
import User from './models/user.js'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'

const resolvers = {
  Query: {
    node: async (root, args) => Person.findOne({ id: args.id }),
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({})
      }  
      return Person.find({ phone: { $exists: args.phone === 'YES' } })
    },
    findPerson: async (root, args) => Person.findOne({  name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
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
    addPerson: async (root, args, context) => {
      const person = new Person({...args})
      const currentUser = context.currentUser 
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      
      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError('saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      context.pubSub.publish('personAdded', { person })
      return person
    },

    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name})
      person.phone = args.phone
      try {
        await person.save()
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return person
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username})
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== process.env.SECRET) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = person => currentUser.friends.map(f => f._id.toString()).incledes(person._id.toString())

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const person = await Person.findOne({ name: args.name })
      if ( !isFriend(person) ) {
        currentUser.friends = currentUser.friends.concat(person)
        currentUser.save()
      }
      return currentUser
    }
  },
  
  Subscription: {
    personAdded: {
      subscribe: (root, args, context) => {
        return context.pubSub.subscribe('personAdded')},
      resolve: (payload) => payload.person,
    }
  }
}

export default resolvers
