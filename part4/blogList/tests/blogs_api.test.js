const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Helper = require('./test_helpers.js')

const api = supertest(app)

test('testing GET request', async () => {
  const blogsInDb = await Helper.blogsInDb()

  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(blogs.body.length).toEqual(blogsInDb.length)
})

test('id is properly defined', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('POST request succesfully creates a new blog', async () => {
  const blogsAtBeginning = await Helper.blogsInDb()
  const newBlog = {
    title: 'JS for seniors',
    author: 'Kevin Lingard',
    url: 'site.com',
    likes: 7
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(blogsAtBeginning.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain('JS for seniors')
})

test('POST request with no likes returns 0 likes', async () => {
  const blogsAtBeginning = await Helper.blogsInDb()
  const newBlog = {
    title: 'Zero likes',
    author: 'Kevin Lingard',
    url: 'site.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(blogsAtBeginning.length + 1)

  const addedBlog = blogsAtEnd.find(blog => blog.title === 'Zero likes')
  expect(addedBlog.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})