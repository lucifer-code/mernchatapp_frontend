import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";

import { refreshSidebarFun } from "../../features/refreshSidebar";

const GroupsList = ({ lightTheme, filteredGroups, userData }) => {
  const dispatch = useDispatch();

  return (
    <div className={"ug-list " + (!lightTheme && "dark")}>
      {filteredGroups.map((group, index) => {
        return (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={"listItem " + (lightTheme ? "" : "dark-bg")}
            key={index}
            onClick={() => {
              console.log("Creating chat with group", group.chatName);
              const config = {
                headers: {
                  Authorization: `Bearer ${userData.data.token}`,
                },
              };
              axios.put(
                "https://mern-chat-app-backend-enzw.onrender.com/chat/addSelfToGroup",
                {
                  chatId: group._id,
                  userId: userData.data._id,
                },
                config
              );
              dispatch(refreshSidebarFun());
            }}>
            <p className={"con-icon" + (lightTheme ? "" : " dark")}>
              {group.chatName[0]}
            </p>
            <p className={"con-title" + (lightTheme ? "" : " dark-bg")}>
              {group.chatName}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default GroupsList;
