// TextInput.js
import React from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";

import { refreshSidebarFun } from "../../features/refreshSidebar";

const TextInput = ({
  messageContent,
  lightTheme,
  sendMessage,
  setMessageContent,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={`text-input-area${lightTheme ? "" : " dark"}`}>
      <input
        placeholder="Type a Message"
        className={`search-box${lightTheme ? "" : " dark"}`}
        value={messageContent}
        onChange={(e) => {
          setMessageContent(e.target.value);
        }}
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            sendMessage();
            setMessageContent("");
            // dispatch(refreshSidebarFun());
            // console.log("refresh side bar");
          }
        }}
      />
      <IconButton
        className={`icon${lightTheme ? "" : " dark"}`}
        onClick={() => {
          sendMessage();
          // dispatch(refreshSidebarFun());
          // console.log("refresh side bar");
        }}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default TextInput;
