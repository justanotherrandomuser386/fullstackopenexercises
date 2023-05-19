const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog') 
const User = require('../models/user')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    const result = await api
      .post('/api/users')
      .send(user)
  }

  for (let blog of helper.initialBlogs) {
    const user = helper.initialUsers[Math.floor(Math.random()*helper.initialUsers.length)]
    const token = await api
      .post('/api/login/')
      .send(user)
      .expect(200)
    
    await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${token.body.token}`})
      .send(blog)
  }
})

test('blogs returned as json', async () => {
    const token = await api
      .post('/api/login/')
      .send(helper.initialUsers[0])
    console.log(token.body.token)
  await api
    .get('/api/blogs')
    .set({'Authorization': `Bearer ${token.body.token}`})
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('correct number of blogs returned', async () => {

  const blogs = await helper.blogsInDB()
  expect(blogs.length).toBe(helper.initialBlogs.length)
})

test('unique identifier of the blog is named id', async () => {
  const blogs = await helper.blogsInDB()
  expect(blogs[0].id).toBeDefined()
})

test('unique identifier of the blog is not named _id', async () => {
  const blogs = await helper.blogsInDB()
  expect(blogs[0]._id).not.toBeDefined()
})

describe('adding blog posts', () => {
  test('new blog post can be added', async () => {
      const newBlog = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
        }
      const token = await api
        .post('/api/login/')
        .send(helper.initialUsers[0])

      await api
        .post('/api/blogs')
        .set({'Authorization': `Bearer ${token.body.token}`})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogs = await helper.blogsInDB()
      expect(blogs.length).toBe(helper.initialBlogs.length + 1)
      expect(blogs.map(blog => blog.title)).toContain(newBlog.title)
  })

  test('likes property defaults to 0', async () => {
      const newBlog = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }
    const token = await api
      .post('/api/login/')
      .send(helper.initialUsers[0])
      
    await api
        .post('/api/blogs')
        .set({'Authorization': `Bearer ${token.body.token}`})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogs = await helper.blogsInDB()
      expect(blogs.length).toBe(helper.initialBlogs.length + 1)
      expect(blogs.filter(blog => blog.title === newBlog.title)[0].likes).toBe(0)
      
  })

  test('new blog post without title can\'t be added', async () => {
      const newBlog = {
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
        }

      const token = await api
        .post('/api/login/')
        .send(helper.initialUsers[0])
      
      await api
        .post('/api/blogs')
        .set({'Authorization': `Bearer ${token.body.token}`})
        .send(newBlog)
        .expect(400)
      
      const blogs = await helper.blogsInDB()
      expect(blogs.length).toBe(helper.initialBlogs.length)
  })

  test('new blog post without url can\'t be added', async () => {
      const newBlog = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          likes: 5,
        }

      const token = await api
        .post('/api/login/')
        .send(helper.initialUsers[0])
      
      await api
        .post('/api/blogs')
        .set({'Authorization': `Bearer ${token.body.token}`})
        .send(newBlog)
        .expect(400)

      const blogs = await helper.blogsInDB()
      expect(blogs.length).toBe(helper.initialBlogs.length)
  })
    
})

describe('deleting blog posts', () => {
  test('deleting existing blog post', async () => {
    
    const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      }
    const token = await api
      .post('/api/login/')
      .send(helper.initialUsers[0])
    
    const savedBlog = await api
      .post('/api/blogs')
       .set({'Authorization': `Bearer ${token.body.token}`})
      .send(newBlog)
    let blogsAfter = await helper.blogsInDB()
    expect(blogsAfter.length).toBe(helper.initialBlogs.length + 1)

    await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
      .set({'Authorization': `Bearer ${token.body.token}`})
      .expect(204)

    blogsAfter = await helper.blogsInDB()
    expect(blogsAfter.length).toBe(helper.initialBlogs.length)
  })

  test('deleting blog post wich does not exist', async () => {
    
    const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      }
    const token = await api
      .post('/api/login/')
      .send(helper.initialUsers[0])
    
    const savedBlog = await api
      .post('/api/blogs')
       .set({'Authorization': `Bearer ${token.body.token}`})
      .send(newBlog)
    let blogsAfter = await helper.blogsInDB()
    expect(blogsAfter.length).toBe(helper.initialBlogs.length + 1)

    await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
      .set({'Authorization': `Bearer ${token.body.token}`})
      .expect(204)
    await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
      .set({'Authorization': `Bearer ${token.body.token}`})

    blogsAfter = await helper.blogsInDB()
    expect(blogsAfter.length).toBe(helper.initialBlogs.length)
  
  })
})


describe('updating blog posts', () => {
  test('updating exisitng blog post', async () => {
    const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      }
    const token = await api
      .post('/api/login/')
      .send(helper.initialUsers[0])
    
    const addedBlog = await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${token.body.token}`})
      .send(newBlog)
    expect(addedBlog.body.url).toBe(newBlog.url)

    const editedBlog = {...newBlog}
    editedBlog.url = 'null'

    const updatedBlog = await api
      .put(`/api/blogs/${addedBlog.body.id}`)
      .set({'Authorization': `Bearer ${token.body.token}`})
      .send(editedBlog)
    expect(updatedBlog.body.id).toBe(addedBlog.body.id)
    expect(updatedBlog.body.url).toBe(editedBlog.url)
  })
  
  test('updating blog post which does not exist', async () => {
    const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      }
    const token = await api
      .post('/api/login/')
      .send(helper.initialUsers[0])
    
    const addedBlog = await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${token.body.token}`})
      .send(newBlog)
    expect(addedBlog.body.url).toBe(newBlog.url)
    await api
      .delete(`/api/blogs/${addedBlog.body.id}`)
      .set({'Authorization': `Bearer ${token.body.token}`})
      .expect(204)
    const editedBlog = {...newBlog}
    editedBlog.url = 'null'

    await api
      .put(`/api/blogs/${addedBlog.body.id}`)
      .set({'Authorization': `Bearer ${token.body.token}`})
      .send(editedBlog)
      .expect(404)
  })

})
afterAll(async () => {
  await mongoose.connection.close()
})


