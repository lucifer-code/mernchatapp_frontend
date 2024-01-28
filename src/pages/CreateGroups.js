import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

import UserSelection from "../components/createGroups/UserSelection";
import { refreshSidebarFun } from "../features/refreshSidebar";

import "../components/myStyles.css";

const CreateGroups = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }

  const user = userData.data;
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserSelection = (userId) => {
    // Toggle user selection
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const createGroup = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios.post(
      "https://mern-chat-app-backend-enzw.onrender.com/chat/createGroup",
      {
        name: groupName,
        users: [userData.data._id, ...selectedUsers], // Include the logged-in user and selected users
      },
      config
    );

    dispatch(refreshSidebarFun());
    navigate("/app/groups");
  };

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Do you want to create a Group Named " + groupName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will create a create group in which you will be the admin and
              other will be able to join this group.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                createGroup();
                handleClose();
              }}
              autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="flex-0.7 flex flex-col">
        <div
          className={
            "createGroups-container ml-3 " + (lightTheme ? "" : " dark")
          }>
          <input
            placeholder="Enter Group Name"
            className={"search-box" + (lightTheme ? "" : " dark")}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={() => {
              handleClickOpen();
            }}>
            <DoneOutlineRoundedIcon />
          </IconButton>
        </div>

        {/* Include the UserSelection component */}
        <div className={"ug-list " + (!lightTheme && "dark")}>
          <UserSelection
            userData={userData}
            lightTheme={lightTheme}
            selectedUsers={selectedUsers}
            onUserSelection={handleUserSelection}
          />
        </div>
      </div>
    </>
  );
};

export default CreateGroups;
