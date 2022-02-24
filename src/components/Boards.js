// import react and utils
import React from "react";
import { ActionCableProvider } from "react-actioncable-provider";
import { useState } from "react";
import Icon from "@mui/material/Icon";
// import { UserContext } from "../App";

// import components
import Event from "./Event";
import NewBoardForm from "./NewBoardForm";
import "../App.css";

function Boards({ user }) {
  // const user = useContext(UserContext);

  // sets state
  const [formPopup, setFormPopup] = useState(false);

  // renders new form popup when button is clicked
  if (formPopup) {
    return <NewBoardForm user={user} setFormPopup={setFormPopup} />;
  }

  // if user has no events, only offer to add new
  if (!user.events) {
    return (
      <div id="board-container">
        <p>You don't have any boards...</p>
        <p>Click to add one now.</p>
        <Icon id="icon-large" onClick={() => setFormPopup(true)}>
          edit_calendar
        </Icon>
      </div>
    );
  }

  // if user has boards, map over and render Event component for each, inside ActionCableProvider
  else
    return (
      <div id="boards-container">
        <div className="welcome">
          <p>welcome, {user.first_name}</p>
          <Icon id="icon-med" onClick={() => setFormPopup(true)}>
            edit_calendar
          </Icon>
        </div>
        <div>
          {/*  map over user.events and render event card for each */}
          {/* <ActionCableProvider url="ws://localhost:3000/cable">
          <Event />
        </ActionCableProvider> */}
        </div>
      </div>
    );
}

export default Boards;
