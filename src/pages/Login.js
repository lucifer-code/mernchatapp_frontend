import React, { useState } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoginForm from "../components/Login/LoginForm";
import SignupForm from "../components/Login/SignupForm";

import logo from "../images/live-chat.png";

import "../components/myStyles.css";

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [loginStatus, setLoginStatus] = useState("");
  const [signinStatus, setSigninStatus] = useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "https://mern-chat-app-backend-enzw.onrender.com/user/login",
        data,
        config
      );
      setLoginStatus({ msg: "Success", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      setLoginStatus({
        msg: "Invalid username or password",
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  const signupHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "https://mern-chat-app-backend-enzw.onrender.com/user/register",
        data,
        config
      );
      setSigninStatus({ msg: "Success", key: Math.random() });
      navigate("/app/welcome");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      if (error.response.status === 405) {
        setSigninStatus({
          msg: "User with this email already exists.",
          key: Math.random(),
        });
      }
      if (error.response.status === 406) {
        setSigninStatus({
          msg: "Username already exists, Please try another one.",
          key: Math.random(),
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="login-container">
        <div className="image-container">
          <img
            src={logo}
            alt="logo"
            className="welcome-logo"
          />
        </div>
        {showLogin ? (
          <LoginForm
            showLogin={() => setShowLogin(false)}
            changeHandler={changeHandler}
            loginHandler={loginHandler}
            loginStatus={loginStatus}
          />
        ) : (
          <SignupForm
            showLogin={() => setShowLogin(true)}
            changeHandler={changeHandler}
            signupHandler={signupHandler}
            signinStatus={signinStatus}
          />
        )}
      </div>
    </>
  );
};

export default Login;
