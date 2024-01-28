// ChatHeader.js
import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatHeader = ({ chatUser, lightTheme }) => {
  return (
    <div className={`chatArea-header${lightTheme ? "" : " dark"}`}>
      <p className={`con-icon${lightTheme ? "" : " dark"}`}>{chatUser[0]}</p>
      <div className={`header-text${lightTheme ? "" : " dark"}`}>
        <p className={`con-title${lightTheme ? "" : " dark"}`}>{chatUser}</p>
      </div>
      <IconButton className={`icon${lightTheme ? "" : " dark"}`}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default ChatHeader;
