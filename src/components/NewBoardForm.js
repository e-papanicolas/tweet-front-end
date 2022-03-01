// import react and utils
import React from "react";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import "../App.css";

export default function NewBoardForm({
  user,
  setFormPopup,
  handleCreateNewEvent,
}) {
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
      <div className="form-title">
        <h2>create a new event board</h2>
        <Icon className="icon-s" onClick={() => setFormPopup(false)}>
          clear
        </Icon>
      </div>
      <div className="form">
        <form onSubmit={(e) => handleCreateNewEvent(e, eventFormData)}>
          <label>Event Name: </label>
          <input
            type="text"
            name="name"
            onChange={handleEventFormChange}
          ></input>
          <label>Hashtag: (do not include #)</label>
          <input
            type="text"
            name="hashtag"
            onChange={handleEventFormChange}
          ></input>
          <label>Streaming Time: </label>
          <select name="timeout" onChange={handleEventFormChange}>
            <option value="select an option">Select an option:</option>
            <option value="900">15 minutes</option>
            <option value="1800">30 minutes</option>
            <option value="3600">1 hour</option>
            <option value="7200">2 hours</option>
          </select>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
}
