const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }  
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  //const token = getTokenFrom(request)  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)  

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })  
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)  
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)  

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })  
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.id)

  if(blog.user.toString() === user.id) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Only user who posted the blog can delete it '})
  }


})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter