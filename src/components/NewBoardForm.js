// import react and utils
import React from "react";
// import { UserContext } from "../App";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import "../App.css";

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
    timeout: 0,
  });

  // handles input changes on form
  function handleEventFormChange(e) {
    if (e.target.name === "timeout") {
      setEventFormData({
        ...eventFormData,
        [e.target.name]: parseInt(e.target.value, 10),
      });
    } else {
      setEventFormData({
        ...eventFormData,
        [e.target.name]: e.target.value,
      });
    }
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
        <label>Hashtag: #</label>
        <input
          type="text"
          name="hashtag"
          onChange={handleEventFormChange}
        ></input>
        <label>Streaming Time: </label>
        <select name="timeout" onChange={handleEventFormChange}>
          <option value="select an option">Select an option:</option>
          <option value="900">900</option>
          <option value="1800">1800</option>
          <option value="3600">3600</option>
          <option value="7200">7200</option>
        </select>
        <input type="submit"></input>
      </form>
    </div>
  );
}
