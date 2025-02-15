import PropTypes from 'prop-types'
import { forwardRef, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const formRef = useRef(null)

  const hideWhenVisibleStyle = { display: visible ? 'none' : '' }
  const showWhenVisibleStyle = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const createBlogHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)
    const title = formData.get('title')
    const author = formData.get('author')
    const url = formData.get('url')

    dispatch(createBlog({ title, author, url }))
    toggleVisibility()
  }

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={createBlogHandler}
        style={showWhenVisibleStyle}
      >
        <div>
          <label htmlFor='title'>title:</label>
          <input type='text' name='title' id='title' />
        </div>
        <div>
          <label htmlFor='author'>author:</label>
          <input type='text' name='author' id='author' />
        </div>
        <div>
          <label htmlFor='url'>url:</label>
          <input type='text' name='url' id='url' />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={() => toggleVisibility()}>
          cancel
        </button>
      </form>
      <button
        type='button'
        onClick={() => toggleVisibility()}
        style={hideWhenVisibleStyle}
      >
        new blog
      </button>
    </div>
  )
}
BlogForm.propTypes = {
  session: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string
  }).isRequired,
}

export default BlogForm