import React from "react";
import { Card } from "reactstrap";
import { Link, Route, Router } from "react-router";

const Login = () => {
  return (
    <div className="wrapping-container">
      <Card className="login-container text-left">
        <h3 className="text-center">Login</h3>
        <label>
          {" "}
          <i>Username</i>{" "}
        </label>
        <input type="text" value="username" className="w-100 login-input" />
        <label>
          {" "}
          <i>Password</i>{" "}
        </label>
        <input type="text" value="**********" className="w-100 login-input" />
        <button className="login-btn btn mt-3">
          <a href="/dashboard"> Login </a>
        </button>
      </Card>
    </div>
  );
};

export default Login;
