import PropTypes from 'prop-types'
import { forwardRef, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button } from './ui/button'

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
    <div className='my-4'>
      <form
        ref={formRef}
        onSubmit={createBlogHandler}
        style={showWhenVisibleStyle}
        className='p-4 space-y-3 max-w-xs shadow-md'
      >
        <div className='flex *:flex-1'>
          <label htmlFor='title'>Title:</label>
          <input type='text' name='title' id='title' className='border shadow-inner'/>
        </div>
        <div className='flex *:flex-1'>
          <label htmlFor='author'>Author:</label>
          <input type='text' name='author' id='author' className='border shadow-inner'/>
        </div>
        <div className='flex *:flex-1'>
          <label htmlFor='url'>Url:</label>
          <input type='text' name='url' id='url' className='border shadow-inner'/>
        </div>
        <div className='space-x-3'>
          <Button type='submit'>create</Button>
          <Button variant='destructive' type='button' onClick={() => toggleVisibility()}>
            cancel
          </Button>
        </div>
      </form>
      <Button
        variant='default'
        size='sm'
        onClick={() => toggleVisibility()}
        style={hideWhenVisibleStyle}
      >
        New Blog
      </Button>
    </div>
  )
}
BlogForm.propTypes = {
  session: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
}

export default BlogForm
