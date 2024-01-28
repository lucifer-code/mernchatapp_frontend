import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";

import { refreshSidebarFun } from "../../features/refreshSidebar";

const UsersList = ({ lightTheme, filteredUsers, userData }) => {
  const dispatch = useDispatch();
  return (
    <div className={"ug-list " + (!lightTheme && "dark")}>
      {filteredUsers.map((user, index) => {
        return (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={"listItem " + (!lightTheme && "dark-bg")}
            key={index}
            onClick={async () => {
              console.log("Creating chat with ", user.name);
              const config = {
                headers: {
                  Authorization: `Bearer ${userData.data.token}`,
                },
              };
              await axios
                .post(
                  "https://mern-chat-app-backend-enzw.onrender.com/chat",
                  { userId: user._id },
                  config
                )
                .then(() => {
                  dispatch(refreshSidebarFun());
                });
            }}>
            <p className={"con-icon " + (!lightTheme && "bg-slate-800")}>
              {user.name[0]}
            </p>
            <p className={"con-title " + (!lightTheme && "dark-bg")}>
              {user.name}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default UsersList;
