import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Togglealbe'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

/*  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
*/
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const login = JSON.parse(loggedUserJSON)
      setUser(login)
      blogService.setToken(login.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const login = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(login))
      blogService.setToken(login.token)
      setUser(login)
      setUsername('')
      setPassword('')
    } catch (exception) {      
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    window.localStorage.clear()
  }

/*
  const addNewBlog = async (event) => {
    event.preventDefault()

    const newObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    try{
      await blogService
      .create(newObject)
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${newObject.title}, by ${newObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch(exception) {
      console.log('exception is', exception)
    }
  }*/

  const loginForm = () => (
    <form onSubmit = {handleLogin}>
      <div>
      <h2>log in to application</h2>
        username
        <input 
          type = "text"
          value = {username}
          name = "Username"
          onChange = {({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange = {({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogList = () => (  
    <div>
    <p>
      {user.name} logged in
      <button onClick = {handleLogout}>logout</button>
    </p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
    )}
    </div>
  )
  
  const blogForm = () => (
    <Toggleable buttonLabel='new blog'>
    <BlogForm
      setMessage={setMessage}
      blogs={blogs}
      setBlogs={setBlogs}
    />
  </Toggleable>
  )


  return (
    <div>
      <h2>blogs</h2>      
      <h2>{message}</h2>
      {user === null 
        ? loginForm()
        : (
          <div>
            {blogList(blogs)}
            {blogForm()}
          </div>
        )        
      }
    </div>
  )
}

export default App

/*
  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <h2>{message}</h2>
      <p>
        {username} logged in
        <button onClick = {handleLogout}>logout</button>
      </p>

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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
*/