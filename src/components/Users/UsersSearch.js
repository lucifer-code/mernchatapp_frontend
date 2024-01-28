import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

const UsersSearch = ({ lightTheme, searchTerm, setSearchTerm }) => {
  return (
    <div className={"sb-search " + (!lightTheme && "dark")}>
      <IconButton>
        <SearchIcon className={"icon " + (!lightTheme && "dark")} />
      </IconButton>
      <input
        placeholder="Search"
        className={"search-box " + (!lightTheme && "dark")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default UsersSearch;
