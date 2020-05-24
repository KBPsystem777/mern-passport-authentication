import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
require("dotenv").config();

const AUTH_LOGIN_ADDRESS = process.env.LOGIN_URL;

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
    }).then((res) => console.log(res.data.token));
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input type="submit" />
    </form>
  );
}

export default LoginForm;
