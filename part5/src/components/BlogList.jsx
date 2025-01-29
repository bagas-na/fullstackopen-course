import { useRef, useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author}
  </div>
);

const CreateBlogForm = ({ setErrorMessage }) => {
  const formRef = useRef(null);

  const createBlogHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current)
      const title = formData.get('title')
      const author = formData.get('author')
      const url = formData.get('url')

      console.log({title, author, url})

      const result = await blogService.create({title, author, url})
      console.log(result)

    } catch (error) {
      setErrorMessage("Error ");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <form ref={formRef} onSubmit={(e) => createBlogHandler(e)}>
      <div>
        <label htmlFor="title">title:</label>
        <input type="text" name="title" id="title" />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input type="text" name="author" id="author" />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input type="text" name="url" id="url" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

const BlogList = ({ blogs, user, setUser }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const logoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };
  return (
    <div>
      <h2>Blogs</h2>
      <CreateBlogForm user={user} setErrorMessage={setErrorMessage} />
      <p>{user.name} logged in.</p>
      <button onClick={() => logoutHandler()}>log out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
