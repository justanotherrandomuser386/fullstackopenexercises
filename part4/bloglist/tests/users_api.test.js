const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')

const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  for (let user of helper.initialUsers) {
    await api
      .post('/api/users/')
      .send(user)
  }
})

describe('adding users', () => {
    
  test('adding correct user to an empty DB', async () => {
    await User.deleteMany({})
    const user ={
      username: 'test',
      name: 'test',
      password: 'test',
    }

    const usersBefore = await helper.usersInDB()
    await api
      .post('/api/users/')
      .send(user)
      .expect(201)

    const usersAfter = await helper.usersInDB()
    expect(usersBefore.length).toBe(usersAfter.length - 1)
  })

  
  test('adding incorrect user to an empty DB', async () => {
    await User.deleteMany({})
    const user ={
      username: 't',
      name: 't',
      password: 'test',
    }

    const usersBefore = await helper.usersInDB()
    await api
      .post('/api/users/')
      .send(user)
      .expect(400)

    const usersAfter = await helper.usersInDB()
    expect(usersBefore.length).toBe(usersAfter.length)
  })

  test('adding multiple correct users to an empty DB', async () => {
    await User.deleteMany({})
    
    const promise = helper.initialUsers.map(async user => {
      await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .then()
    })

    await Promise.all(promise)

    const usersAfter = await helper.usersInDB()
    expect(helper.initialUsers.length).toBe(usersAfter.length)
  })


  test('adding correct duplicate user to a not empty DB', async () => {
    const user ={
      username: 'test',
      name: 'test',
      password: 'test',
    }

    const usersBefore = await helper.usersInDB()
    await api
      .post('/api/users/')
      .send(user)
      .expect(201)
    await api
      .post('/api/users/')
      .send(user)
      .expect(400)

    const usersAfter = await helper.usersInDB()
    expect(usersBefore.length).toBe(usersAfter.length - 1)
  })
  test('adding correct user to a not empty DB', async () => {
    const user ={
      username: 'test',
      name: 'test',
      password: 'test',
    }
    
    const usersBefore = await helper.usersInDB()
    await api
      .post('/api/users/')
      .send(user)
      .expect(201)

    const usersAfter = await helper.usersInDB()
    expect(usersBefore.length).toBe(usersAfter.length - 1)
  })
})

describe('obtaining auth token', () => {
  test('login with correct credentials', async () => {
    const user = helper.initialUsers[0]
    const firstToken = await api
      .post('/api/login')
      .send(user)
      .expect(200)
  })

  test('login with incorrect credentials', async () => {
    const user = helper.initialUsers[0]
    user.password = 'wrong'
    const firstToken = await api
      .post('/api/login')
      .send(user)
      .expect(400)
  })


})

afterAll(async () => {
  await mongoose.connection.close()
})
