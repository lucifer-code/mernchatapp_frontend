import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

import ChatHeader from "../components/chatArea/ChatHeader";
import MessageSelf from "../components/chatArea/MessageSelf";
import MessageOthers from "../components/chatArea/MessageOthers";
import TextInput from "../components/chatArea/TextInput";
import Skeleton from "@mui/material/Skeleton";
import { refreshSidebarFun } from "../features/refreshSidebar";

const ENDPOINT = "https://mern-chat-app-backend-enzw.onrender.com";
var socket;

const ChatArea = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const lightTheme = useSelector((state) => state.themeKey);
  const refresh = useSelector((state) => state.refreshKey);

  const [messageContent, setMessageContent] = useState("");
  const [chat_id, chat_user] = params.id.split("&");
  const [loaded, setLoaded] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }

  const sendMessage = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .post(
        "https://mern-chat-app-backend-enzw.onrender.com/message/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then((response) => {
        setMessageContent(""); // Clear the message input
        console.log("Message Fired");
        socket.emit("new message", response);
        dispatch(refreshSidebarFun());
      });
  };

  // Connect to socket
  useEffect(() => {
    // Open socket connection here
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connected", () => {
      console.log("Socket connected");
    });

    // Close socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // New message received
  useEffect(() => {
    socket.on("message received", (newMessage) => {
      // Use a callback function to update allMessages
      setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("message recieved");
      dispatch(refreshSidebarFun());
    });
  }, []);

  // Fetch chats
  useEffect(() => {
    console.log("fetched chats");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .get("https://mern-chat-app-backend-enzw.onrender.com/message/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setLoaded(true);
        socket.emit("join chat", chat_id);
      });
  }, [chat_id, userData.data.token, refresh]);

  if (!loaded) {
    return (
      <div className="flex-0.7 border-solid rounded-lg p-2.5 w-full flex flex-col gap-2.5">
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
    return (
      <div className={"chatArea-container" + (lightTheme ? "" : " dark-bg")}>
        <ChatHeader
          chatUser={chat_user}
          lightTheme={lightTheme}
        />
        <div className={"messages-container" + (lightTheme ? "" : " dark")}>
          {allMessages.map((message, index) => {
            const sender = message.sender;
            const self_id = userData.data._id;
            if (sender._id === self_id) {
              return (
                <MessageSelf
                  props={message}
                  key={index}
                />
              );
            } else {
              return (
                <MessageOthers
                  props={message}
                  key={index}
                />
              );
            }
          })}
        </div>

        <TextInput
          messageContent={messageContent}
          lightTheme={lightTheme}
          sendMessage={sendMessage}
          setMessageContent={setMessageContent}
          dispatch={dispatch}
        />
      </div>
    );
  }
};

export default ChatArea;
