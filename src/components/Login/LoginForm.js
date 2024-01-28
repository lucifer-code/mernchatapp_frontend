import React from "react";
import { Button, TextField } from "@mui/material";

import Toaster from "../Toaster";

const LoginForm = ({ showLogin, changeHandler, loginHandler, loginStatus }) => {
  return (
    <div className="login-box">
      <p className="login-text">Login to your Account</p>

      <TextField
        onChange={changeHandler}
        id="standard-basic"
        label="Enter Username"
        variant="outlined"
        color="secondary"
        name="name"
      />
      <TextField
        onChange={changeHandler}
        id="outlined-password-input"
        label="Enter Password"
        type="password"
        autoComplete="current-password"
        color="secondary"
        variant="outlined"
        name="password"
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            loginHandler(event);
          }
        }}
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={loginHandler}>
        Login
      </Button>
      <p>
        Don't have an account ?
        <span
          className="hyper"
          onClick={showLogin}>
          Sign Up
        </span>
      </p>
      {loginStatus ? (
        <Toaster
          key={loginStatus.key}
          message={loginStatus.msg}
        />
      ) : null}
    </div>
  );
};

export default LoginForm;
