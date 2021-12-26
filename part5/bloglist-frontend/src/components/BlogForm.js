import React, { useState } from 'react'
import Blog from './Blog'
import blogService from './../services/blogs'

const NoteForm = ({ setMessage, blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = async (event) => {
    event.preventDefault()

    const newObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    try{
      const addedBlog = await blogService.create(newObject)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs([...blogs, addedBlog].sort((a, b) => b.likes - a.likes))
      setMessage(`a new blog ${newObject.title}, by ${newObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch(exception) {
      console.log('exception is', exception)
    }
  }

  return (
    <div>

      <h2>create new</h2>
      <form onSubmit = {addNewBlog}> 
        <div>
          title
          <input
            type = "text"
            value = {title}
            name = "Title"
            onChange = {({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author
          <input
            type = "text"
            value = {author}
            name = "Author"
            onChange = {({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url
          <input
            type = "text"
            value = {url}
            name = "Url"
            onChange = {({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
} 

export default NoteForm