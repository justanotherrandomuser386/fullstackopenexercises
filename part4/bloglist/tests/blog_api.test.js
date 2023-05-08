const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../model/blog') 
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let newBlog = Blog(blog)
    await newBlog.save()
  }

})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('correct number of blogs returned', async () => {
  const blogs = await helper.blogsInDB()

  expect(blogs.length).toBe(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})


