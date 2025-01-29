import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";

const Blog = ({ blog, likeHandler }) => {
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const hideWhenDetailed = { display: showDetail ? "none" : "" };
  const showWhenDetailed = { display: showDetail ? "" : "none" };

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <p style={{ margin: 0, display: "inline" }}>{blog.title} </p>
      <button type="button" style={hideWhenDetailed} onClick={() => toggleDetail()}>
        view
      </button>
      <button type="button" style={showWhenDetailed} onClick={() => toggleDetail()}>
        hide
      </button>
      <div style={showWhenDetailed}>
        <p style={{ margin: 0 }}>{blog.url}</p>
        <p style={{ margin: 0, display: "inline" }}>likes: {blog.likes} </p>
        <button type="button" onClick={() => likeHandler(blog.id)}>
          like
        </button>
        <p style={{ margin: 0 }}>{blog.author}</p>
      </div>
    </div>
  );
};

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

  const incrementLike = async (blogId) => {
    await blogService.incrementLike(blogId);
    const newBlogs = await blogService.getAll();
    setBlogs(newBlogs);
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
      {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} likeHandler={incrementLike} />
      ))}
    </div>
  );
};

export default Blogs;
