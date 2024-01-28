import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";

import "../components/myStyles.css";

const MainContainer = () => {
  // const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);

  return (
    <div className={"main-container " + (!lightTheme && "dark-bg")}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainContainer;
