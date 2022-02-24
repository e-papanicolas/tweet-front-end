import React from "react";
// import { UserContext } from "../App";
import { useState } from "react";
import "../App.css";
import Icon from "@mui/material/Icon";

export default function NewBoardForm({
  user,
  setFormPopup,
  handleCreateNewEvent,
}) {
  // const user = useContext(UserContext);

  // sets state
  const [eventFormData, setEventFormData] = useState({
    user_id: user.id,
    name: "",
    hashtag: "",
  });

  // handles input changes on form
  function handleEventFormChange(e) {
    setEventFormData({
      ...eventFormData,
      [e.target.name]: e.target.value,
    });
  }

  // form render
  return (
    <div id="board-form">
      <h2>create a new event board</h2>
      <Icon className="icon-s" onClick={() => setFormPopup(false)}>
        clear
      </Icon>
      <form
        className="new-board-form"
        onSubmit={(e) => handleCreateNewEvent(e, eventFormData)}
      >
        <label>Event name: </label>
        <input type="text" name="name" onChange={handleEventFormChange}></input>
        <label>Hashtag: </label>
        <input
          type="text"
          name="hashtag"
          onChange={handleEventFormChange}
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}
