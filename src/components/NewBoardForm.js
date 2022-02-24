import React from "react";
// import { UserContext } from "../App";
// import { useContext } from "react";
import "../App.css";
import Icon from "@mui/material/Icon";

export default function NewBoardForm({ user, setFormPopup }) {
  const token = localStorage.getItem("jwt");
  // const user = useContext(UserContext);

  function handleCreateNewEvent(e) {
    e.preventDefault();
  }

  return (
    <div id="board-form">
      <h2>create a new event board</h2>
      <Icon className="icon-s" onClick={() => setFormPopup(false)}>
        clear
      </Icon>
      <form className="new-board-form" onSubmit={handleCreateNewEvent}>
        <label>Event name: </label>
        <input type="text" name="event_name"></input>
        <label>Hashtag: </label>
        <input type="text" name="hashtag"></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}
