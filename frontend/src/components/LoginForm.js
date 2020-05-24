import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { Link } from "react-router-dom";

require("dotenv").config();

const AUTH_LOGIN_ADDRESS =
  process.env.LOGIN_URL || "https://kbp-auth.now.sh/login";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: AUTH_LOGIN_ADDRESS,
      data: qs.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((res) => console.log(res));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Login</h2>
      </div>
      <input
        type="email"
        required
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        required
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Login" />
      <div>
        No Account yet? <Link to={"/signup"}>Sign up</Link> now
      </div>
    </form>
  );
}

export default LoginForm;
