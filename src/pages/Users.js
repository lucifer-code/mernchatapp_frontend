import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { refreshSidebarFun } from "../features/refreshSidebar";

import UsersHeader from "../components/Users/UsersHeader";
import UsersSearch from "../components/Users/UsersSearch";
import UsersList from "../components/Users/UsersList";

import "../components/myStyles.css";

const Users = () => {
  const refresh = useSelector((state) => state.refreshKey);
  const lightTheme = useSelector((state) => state.themeKey);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  if (!userData) {
    console.log("User not authenticated");
    navigate("/");
  }

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

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "easeInOut",
          duration: "0.3",
        }}
        className={"list-container " + (lightTheme ? "" : "dark-bg")}>
        <UsersHeader lightTheme={lightTheme} />
        <UsersSearch
          lightTheme={lightTheme}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <UsersList
          lightTheme={lightTheme}
          filteredUsers={filteredUsers}
          userData={userData}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Users;
