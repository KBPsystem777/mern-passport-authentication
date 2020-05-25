import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";

require("dotenv").config();

const AUTH_SIGNUP_ADDRESS =
  process.env.SIGNUP_URL || "https://kbp-auth.now.sh/signup";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: AUTH_SIGNUP_ADDRESS,
      data: qs.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input value="Sign Up" type="submit" />
      </form>
      <div>
        <div>
          Already have an account? Login <Link to={"/login"}>here</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
