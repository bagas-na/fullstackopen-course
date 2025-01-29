import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";

const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author}
  </div>
);

const BlogForm = forwardRef(({ createBlog }, ref) => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef(null);

  const hideWhenVisibleStyle = { display: visible ? "none" : "" };
  const showWhenVisibleStyle = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  const createBlogHandler = async (e) => {
    e.preventDefault();

    console.log("submitting form", formRef.current);
    const formData = new FormData(formRef.current);
    console.log("formData", formData);
    const title = formData.get("title");
    const author = formData.get("author");
    const url = formData.get("url");

    await createBlog(title, author, url);
  };

  return (
    <div>
      <form ref={formRef} onSubmit={createBlogHandler} style={showWhenVisibleStyle}>
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
        <button type="button" onClick={() => toggleVisibility()}>
          cancel
        </button>
      </form>
      <button type="button" onClick={() => toggleVisibility()} style={hideWhenVisibleStyle}>
        new blog
      </button>
    </div>
  );
});

BlogForm.displayName = "BlogForm";

const Blogs = ({ blogs, setBlogs, user, setUser }) => {
  const [notification, setNotification] = useState({ isError: false, message: null });
  const blogFormRef = useRef(null);

  const createBlog = async (title, author, url) => {
    try {
      await blogService.create({ title, author, url });
      const newBlogs = await blogService.getAll();

      setBlogs(newBlogs);
      blogFormRef.current.toggleVisibility();

      setNotification({
        isError: false,
        message: `Sucessfully added blog ${title}${author.length > 0 ? ` by ${author}` : ""}!`,
      });
      setTimeout(() => {
        setNotification({ isError: false, message: null });
      }, 5000);
    } catch (error) {
      setNotification({ isError: true, message: "Failed adding a blog" });
      setTimeout(() => {
        setNotification({ isError: false, message: null });
      }, 5000);
    }
  };

  const logoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification isError={notification.isError} message={notification.message} />
      <BlogForm createBlog={createBlog} ref={blogFormRef} />
      <p>{user.name} logged in.</p>
      <button onClick={() => logoutHandler()}>log out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
