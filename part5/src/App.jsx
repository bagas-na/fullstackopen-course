import { useEffect, useState } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <>
      {user === null ? (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <BlogList blogs={blogs} user={user} setUser={setUser} />
      )}
    </>
  );
};

export default App;
