import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUrl = "/api/login";
  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      user = await loginService.login({ username, password });
      console.log(user)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to Application</h2>
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="">username</label>
          <input
            type="text"
            id="username"
            name="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">password</label>
          <input
            type="text"
            id="password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
