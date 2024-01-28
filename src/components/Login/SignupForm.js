import React from "react";
import { Button, TextField } from "@mui/material";

import Toaster from "../Toaster";

const SignupForm = ({
  showLogin,
  changeHandler,
  signupHandler,
  signinStatus,
}) => {
  return (
    <div className="login-box">
      <p className="login-text">Create your Account</p>

      <TextField
        onChange={changeHandler}
        id="standard-basic1"
        label="Enter Username"
        variant="outlined"
        color="secondary"
        name="name"
        helperText=""
      />
      <TextField
        onChange={changeHandler}
        id="standard-basic2"
        label="Enter Email"
        variant="outlined"
        color="secondary"
        name="email"
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
            signupHandler(event);
          }
        }}
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={signupHandler}>
        Sign Up
      </Button>
      <p>
        Already have an account ?
        <span
          className="hyper"
          onClick={showLogin}>
          Log in
        </span>
      </p>
      {signinStatus ? (
        <Toaster
          key={signinStatus.key}
          message={signinStatus.msg}
        />
      ) : null}
    </div>
  );
};

export default SignupForm;
