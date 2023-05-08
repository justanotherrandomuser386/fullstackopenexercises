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

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogs = await helper.blogsInDB()
      expect(blogs.length).toBe(helper.initialBlogs.length + 1)
      expect(blogs.map(blog => blog.title)).toContain(newBlog.title)
  })

  test('likes propery is defaults to 0', async () => {
      const newBlog = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }
      
    await api
        .post('/api/blogs')
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

      await api
        .post('/api/blogs')
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

      await api
        .post('/api/blogs')
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
    const savedBlog = await api.post('/api/blogs').send(newBlog)
    let blogsAfter = await helper.blogsInDB()
    expect(blogsAfter.length).toBe(helper.initialBlogs.length + 1)

    await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
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
    const savedBlog = await api.post('/api/blogs').send(newBlog)
    let blogsAfter = await helper.blogsInDB()
    expect(blogsAfter.length).toBe(helper.initialBlogs.length + 1)
    await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
      .expect(204)

    await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
      .expect(204)
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
    
    const addedBlog = await api.post('/api/blogs').send(newBlog)
    expect(addedBlog.body.url).toBe(newBlog.url)

    const editedBlog = {...newBlog}
    editedBlog.url = 'null'

    const updatedBlog = await api.put(`/api/blogs/${addedBlog.body.id}`).send(editedBlog)
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
    
    const addedBlog = await api.post('/api/blogs').send(newBlog)
    expect(addedBlog.body.url).toBe(newBlog.url)
    await api.delete(`/api/blogs/${addedBlog.body.id}`).expect(204)
    const editedBlog = {...newBlog}
    editedBlog.url = 'null'

    await api
      .put(`/api/blogs/${addedBlog.body.id}`)
      .send(editedBlog)
      .expect(404)
  })

})
afterAll(async () => {
  await mongoose.connection.close()
})


