const mongoose = require('mongoose')
var util= require('util')
var encoder = new util.TextEncoder('utf-8')
const supertest = require('supertest')
const app = require('../app')
const Helper = require('./test_helpers.js')
const User = require('../models/user')

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
    .expect(200)
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
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(blogsAtBeginning.length + 1)

  const addedBlog = blogsAtEnd.find(blog => blog.title === 'Zero likes')
  expect(addedBlog.likes).toBe(0)
})

test('title or url missng returns status code 400', async () => {
  const newBlog = {
    author: 'No url',
    author: 'Noone'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('delete request with valid id is sucessful', async () => {
  const blogsAtBeginning = await Helper.blogsInDb()
  const blogToDelete = blogsAtBeginning[1]
  
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await Helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(blogsAtBeginning.length - 1)
})

test('delete request with invalid id returns status code 400', async () => {
  const invalidId = '5a3d5da59070081a82a3445'
  
  await api
    .delete(`/api/blogs/${invalidId}`)
    .expect(400)
})

describe('adding invalid user', () => {
  test('missing usernmame', async () => {
    const newUser = {
      name: "testing",
      password: "123456"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('invalid password', async () => {
    const newUser = {
      username: "test password",
      name: "testing",
      password: "12"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})