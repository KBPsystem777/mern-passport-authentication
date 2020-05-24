import React from "react";
import { Link } from "react-router-dom";

require("dotenv").config();

const AUTH_SIGNUP_ADDRESS = process.env.SIGNUP_URL;

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div>
      <h2>Sign Up</h2>
      <form>
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
