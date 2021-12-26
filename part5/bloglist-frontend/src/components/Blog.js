import React, { useState } from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [Visible, setVisible] = useState(false)

  const hideWhenVisible = {display: Visible ? 'none' : ''}
  const showWhenVisible = {display: Visible ? '' : 'none'}

  const likeBlog = async (event) => {
    event.preventDefault()

    const url = blog.id

    const newObject = {
      user:blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    try{
      const addedBlog = await blogService
      .update(url, newObject)
      const updatedBlogs = blogs.map((blog) => {
        return blog.id === addedBlog.id
          ? { ...blog, likes: addedBlog.likes }
          : blog;
      })
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    }
    catch(exception) {
      console.log('exception is', exception)
    }
  }

  const removeBlog = async (event) => {
    event.preventDefault()

    const url = blog.id
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)){
      try{
        await blogService.remove(url)
        
        setBlogs(
          blogs.filter((blog) => {
            return blog.id !== url;
          })
        )
      }
      catch(exception) {
        console.log('exception is', exception)
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} 
        <button onClick={()=>setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} {blog.url}
        <p>{blog.url}</p>
        <p>
          likes {}
          {blog.likes}
          <button onClick={likeBlog}>
            like
          </button>
        </p>
        <p>{blog.user.username}</p>
        <p>
          <button onClick={removeBlog}>
            remove
          </button>
        </p>
        <button onClick={()=>setVisible(false)}>hide</button>
      </div>
    </div>  
)}

export default Blog