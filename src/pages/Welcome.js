import React, { useEffect } from "react";
import logo from "../images/live-chat.png";
import { useNavigate } from "react-router-dom";

import "../components/myStyles.css";

const Welcome = () => {
  const nav = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      console.log("User not authenticated");
      nav("/");
    }
  }, [nav]);
  return (
    <div className="welcome-container">
      <img
        className="welcome-logo"
        src={logo}
        alt="logo"
      />
      <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  );
};

export default Welcome;
