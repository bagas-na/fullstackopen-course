import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";

const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author}
  </div>
);

const CreateBlogForm = forwardRef(({ setNotification, setBlogs }, ref) => {
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
    try {
      const formData = new FormData(formRef.current);
      const title = formData.get("title");
      const author = formData.get("author");
      const url = formData.get("url");

      await blogService.create({ title, author, url });
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
      setVisible(false);
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

  return (
    <div>
      <form ref={formRef} onSubmit={(e) => createBlogHandler(e)} style={showWhenVisibleStyle}>
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

CreateBlogForm.displayName = "CreateBlogForm";

const BlogList = ({ blogs, setBlogs, user, setUser }) => {
  const [notification, setNotification] = useState({ isError: false, message: null });

  const logoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };
  return (
    <div>
      <h2>Blogs</h2>
      <Notification isError={notification.isError} message={notification.message} />
      <CreateBlogForm user={user} setBlogs={setBlogs} setNotification={setNotification} />
      <p>{user.name} logged in.</p>
      <button onClick={() => logoutHandler()}>log out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
