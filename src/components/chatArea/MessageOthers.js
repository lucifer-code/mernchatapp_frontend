import React from "react";
import { useSelector } from "react-redux";

import "../myStyles.css";

function MessageOthers({ props }) {
  //const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  // console.log("message others : ", props);
  return (
    <div className={"other-message-container" + (lightTheme ? "" : " dark")}>
      <div className={"conversation-container" + (lightTheme ? "" : " dark")}>
        <p className={"con-icon" + (lightTheme ? "" : " dark-bg")}>
          {props.sender.name[0]}
        </p>
        <div className={"other-text-content" + (lightTheme ? "" : " dark-bg")}>
          <p className={"con-title" + (lightTheme ? "" : " dark-bg")}>
            {props.sender.name}
          </p>
          <p className={"con-lastMessage" + (lightTheme ? "" : " dark-bg")}>
            {props.content}
          </p>
          {/* <p className="self-timeStamp">12:00am</p> */}
        </div>
      </div>
    </div>
  );
}

export default MessageOthers;
