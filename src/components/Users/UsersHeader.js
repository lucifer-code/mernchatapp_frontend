import React from "react";
import { useDispatch } from "react-redux";

import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

import { refreshSidebarFun } from "../../features/refreshSidebar";

import logo from "../../images/live-chat.png";

const UsersHeader = ({ lightTheme }) => {
  const dispatch = useDispatch();
  return (
    <div className={"ug-header justify-between " + (lightTheme ? "" : "dark")}>
      <img
        src={logo}
        alt="logo"
        style={{
          height: "2rem",
          width: "2rem",
          marginLeft: "10px",
        }}
      />
      <p className={"ug-title " + (lightTheme ? "" : "dark-text")}>
        Available Users
      </p>
      <IconButton
        onClick={() => {
          dispatch(refreshSidebarFun());
        }}>
        <RefreshIcon className={"icon " + (!lightTheme && "dark")} />
      </IconButton>
    </div>
  );
};

export default UsersHeader;
