import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import GroupsHeader from "../components/Groups/GroupsHeader";
import GroupsSearch from "../components/Groups/GroupsSearch";
import GroupsList from "../components/Groups/GroupsList";

import "../components/myStyles.css";

const Groups = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const refresh = useSelector((state) => state.refreshKey);
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

  const userData = JSON.parse(localStorage.getItem("userData"));
  const user = userData.data;

  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get("https://mern-chat-app-backend-enzw.onrender.com/chat/fetchGroups", config)
      .then((response) => {
        setGroups(response.data);
      });
  }, [refresh, user.token]);

  // Filter groups based on the search term
  const filteredGroups = groups.filter((group) =>
    group.chatName.toLowerCase().includes(searchTerm.toLowerCase())
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
        <GroupsHeader lightTheme={lightTheme} />
        <GroupsSearch
          lightTheme={lightTheme}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <GroupsList
          lightTheme={lightTheme}
          filteredGroups={filteredGroups}
          userData={userData}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Groups;
