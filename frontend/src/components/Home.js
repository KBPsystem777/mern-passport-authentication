import React from "react";
import LoginForm from "./LoginForm";

function Home() {
  return (
    <div className="welcome-banner">
      <h1>Welcome to Testing Site!</h1>
      <div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Home;
