const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author}
  </div>
);

const BlogList = ({ blogs, user, setUser }) => {
  const logoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in.</p>
      <button onClick={() => logoutHandler()}>log out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
