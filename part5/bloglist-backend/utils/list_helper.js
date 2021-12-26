const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  const likesArray = array.map(blog => blog.likes)

  return array.length === 0
    ? 0
    : likesArray.reduce(reducer)
}

const favoriteBlog = (array) => {
  if (!array.length) {
    return []
  }

  const likes = array.map(blog => blog.likes)

  const max = Math.max(...likes)

  const index = likes.indexOf(max)

  /*const blog = {
    title: array[index].title,
    author: array[index].author,
    likes: array[index].likes
  }*/

  return array[index]
}

const mostBlogs = (array) => {
  if (!array.length) {
    return []
  }

  var _ = require('lodash')
  const authorBlogs = _.countBy(array, blog => blog.author)

  const authors = Object.keys(authorBlogs)
  const blogs = Object.values(authorBlogs)

  const max = Math.max(...blogs)

  const index = blogs.indexOf(max)

  const authorLikes = {
    author: authors[index],
    blogs: blogs[index]
  }

  return authorLikes
}

const mostLikes = array => {
  if (!array.length) {
    return []
  }
  
  let authorLikes = array.reduce((op, {author, likes}) => {
    op[author] = op[author] || 0
    op[author] += likes
    return op
  },{})

  const authors = Object.keys(authorLikes)
  const likes = Object.values(authorLikes)

  const max = Math.max(...likes)

  const index = likes.indexOf(max)

  const authorMostLikes = {
    author: authors[index],
    likes: likes[index]
  }

  return authorMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}