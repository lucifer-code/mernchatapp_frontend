import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const UserSelection = ({
  userData,
  lightTheme,
  selectedUsers,
  onUserSelection,
}) => {
  const [users, setUsers] = useState([]);
  const refresh = useSelector((state) => state.refreshKey);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    axios.get("https://mern-chat-app-backend-enzw.onrender.com/user/fetchUsers", config).then((data) => {
      setUsers(data.data);
    });
  }, [refresh, userData.data.token]);

  return (
    <>
      {users.map((user, index) => {
        const isSelected = selectedUsers.includes(user._id);

        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={"listItem " + (!lightTheme && "dark-bg")}
            onClick={() => onUserSelection(user._id)}>
            <p className={"con-icon " + (!lightTheme && "bg-slate-800")}>
              {user.name[0]}
            </p>
            <p className={"con-title " + (!lightTheme && "dark-bg")}>
              {user.name}
            </p>
            {isSelected && (
              <div className="selected-icon">✓</div> // Visual indication of selected users
            )}
          </motion.div>
        );
      })}
    </>
  );
};

export default UserSelection;
