import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { toggleTheme } from "../features/themeSlice";
import { refreshSidebarFun } from "../features/refreshSidebar";

import "./myStyles.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const refresh = useSelector((state) => state.refreshKey);
  // const { refresh, setRefresh } = useContext(myContext);
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }

  const user = userData.data;

  //fetching chats
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get("https://mern-chat-app-backend-enzw.onrender.com/chat", config)
      .then((response) => {
        setConversations(response.data);
      })
      .then(() => {
        console.log(conversations);
      });
    console.log("fetching convos");
  }, [refresh, user.token]);

  const filteredConversations = conversations.filter((conversation) => {
    // If search query is empty, show all conversations (normal behavior)
    if (searchQuery.trim() === "") {
      return true;
    }

    // Check if the chat name contains the search query (case-insensitive)
    const chatName = conversation.isGroupChat
      ? conversation.chatName
      : conversation.users.find((user) => user._id !== userData.data._id).name;
    return chatName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div
      className={
        "flex-0.3 flex flex-col lg:flex-0" + (lightTheme ? "" : "dark-bg")
      }>
      <div
        className={
          "bg-white rounded-2xl py-2 px-1 m-2 mb-0 flex justify-between shadow-md" +
          " sm:flex-col sm:justify-around sm:items-center sm:flex-grow " +
          (lightTheme ? "" : "dark")
        }>
        <div className="sm:flex sm:flex-col">
          <IconButton
            onClick={() => {
              navigate("/app/welcome");
            }}>
            <AccountCircleIcon
              fontSize="large"
              className={lightTheme ? "" : "dark"}
            />
          </IconButton>
        </div>
        <div className="sm:flex sm:flex-col">
          <IconButton
            onClick={() => {
              navigate("users");
            }}>
            <PersonAddIcon
              fontSize="large"
              className={lightTheme ? "" : "dark"}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("groups");
            }}>
            <GroupAddIcon
              fontSize="large"
              className={lightTheme ? "" : "dark"}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("create-groups");
            }}>
            <AddCircleIcon
              fontSize="large"
              className={lightTheme ? "" : "dark"}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(toggleTheme());
            }}>
            {lightTheme ? (
              <NightlightIcon
                fontSize="large"
                className={lightTheme ? "" : "dark"}
              />
            ) : (
              <LightModeIcon
                fontSize="large"
                className={lightTheme ? "" : "dark"}
              />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/");
            }}>
            <ExitToAppIcon
              fontSize="large"
              className={lightTheme ? "" : "dark"}
            />
          </IconButton>
        </div>
      </div>
      <div
        className={
          "bg-white rounded-2xl p-1 m-2 mb-0 flex items-center shadow-md sm:hidden " +
          (lightTheme ? "" : "dark")
        }>
        <IconButton>
          <SearchIcon
            fontSize="large"
            className={lightTheme ? "" : "dark"}
          />
        </IconButton>
        <input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Step 2: Handle input changes
          className={
            "border-0 text-base ml-1 py-0 px-1 w-full text-gray-400 !outline-none " +
            (lightTheme ? "" : "dark")
          }
        />
      </div>
      <div className={"sb-conversations " + (lightTheme ? "" : "dark")}>
        {filteredConversations.map((conversation, index) => {
          var chatName = "";
          if (conversation.isGroupChat) {
            chatName = conversation.chatName;
          } else {
            conversation.users.forEach((user) => {
              if (user._id !== userData.data._id) {
                chatName = user.name;
              }
            });
          }
          if (conversation.latestMessage === undefined) {
            return (
              <div key={index}>
                <div
                  key={index}
                  className={
                    "conversation-container " +
                    (lightTheme ? "bg-slate-200" : "dark-bg")
                  }
                  onClick={() => {
                    navigate("chat/" + conversation._id + "&" + chatName);
                    dispatch(refreshSidebarFun());
                  }}>
                  <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                    {chatName[0]}
                  </p>
                  <p className={"con-title" + (lightTheme ? "" : " dark-bg")}>
                    {chatName}
                  </p>

                  <p
                    className={
                      "con-lastMessage " +
                      (lightTheme ? "text-black" : "text-white")
                    }>
                    No previous Messages, click here to start a new chat
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className={
                  "conversation-container " +
                  (lightTheme ? "bg-slate-200" : "dark-bg")
                }
                onClick={() => {
                  navigate("chat/" + conversation._id + "&" + chatName);
                  dispatch(refreshSidebarFun());
                }}>
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                  {chatName[0]}
                  {/* {conversation.users[1].name[0]} */}
                </p>
                <p className={"con-title" + (lightTheme ? "" : " dark-bg")}>
                  {chatName}
                  {/* {conversation.users[1].name} */}
                </p>

                <p
                  className={
                    "con-lastMessage " + (!lightTheme && "text-white")
                  }>
                  {conversation.latestMessage.content}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Sidebar;
