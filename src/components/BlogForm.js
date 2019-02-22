import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogForm = ({ blogs, setBlogs, setSuccessMessage, setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = React.createRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      const response = await blogService.create({
        title: title,
        author: author,
        url: url
      })

      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')

      console.log(`a new blog ${response.title} added`)
      setSuccessMessage(`a new blog ${response.title} added`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (exception) {
      console.log(exception)
      if (exception.response) {
        setErrorMessage(exception.response.data.error)
        setTimeout(() => setErrorMessage(null), 3000)
      }
    }
  }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
