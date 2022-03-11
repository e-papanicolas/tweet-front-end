// import react and utils
import React from "react";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import "../App.css";
import "../styles/Boards.css";

export default function NewBoardForm({
  user,
  setFormPopup,
  handleCreateNewEvent,
  removeSpacesFromHashtag,
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
    } else if (e.target.name === "hashtag") {
      setEventFormData({
        ...eventFormData,
        [e.target.name]: removeSpacesFromHashtag(e.target.value),
      });
    } else {
      setEventFormData({
        ...eventFormData,
        [e.target.name]: e.target.value,
      });
    }
  }

  // info for the hovers on the form
  const appInfo = `A TweetStream event board can be used for a variety of occasions, any celebrations where you would want to follow a hashtag, think weddings or graduations. An event board connects you to the Twitter Stream and this connection allows the event board to collect Tweets for you that match your hashtag and displays them in real time.`;
  const nameInfo = `The name of your event will be displayed on the top of your event board and you can name it anything you'd like, ex: "Kristin's Bachelorette Party!"`;
  const hashtagInfo = `The hashtag you choose will also be displayed on the top of your event board, and for the duration of streaming, any Tweets matching the hashtag will be streamed to your event board, ex: "kristinsbach". Don't worry about the hashtag, we've included that for you!`;
  const streamingInfo = `Your event board is connected to the Twitter Stream for the length of time you select.`;

  // renders form view
  return (
    <div id="board-form">
      <div className="form-title">
        <div className="closing-x">
          <Tooltip title="close">
            <Icon className="icon-s" onClick={() => setFormPopup(false)}>
              clear
            </Icon>
          </Tooltip>
        </div>
        <h2>Create a new event board</h2>
        <p className="app-info">{appInfo}</p>
      </div>
      <div className="form">
        <form onSubmit={(e) => handleCreateNewEvent(e, eventFormData)}>
          <h3>
            What should this event be called ?{" "}
            <Tooltip placement="right-start" title={nameInfo}>
              <Icon id="info-icon">help</Icon>
            </Tooltip>
          </h3>
          <input
            type="text"
            name="name"
            onChange={handleEventFormChange}
          ></input>
          <h3>
            What hashtag are you following ?{" "}
            <Tooltip placement="right-start" title={hashtagInfo}>
              <Icon id="info-icon">help</Icon>
            </Tooltip>
          </h3>
          <span className="hashtag-input">
            <p>#</p>
            <input
              type="text"
              name="hashtag"
              onChange={handleEventFormChange}
            ></input>
            <p>#</p>
          </span>
          <h3>
            Streaming Duration ?{" "}
            <Tooltip placement="right-start" title={streamingInfo}>
              <Icon id="info-icon">help</Icon>
            </Tooltip>
          </h3>
          <select name="timeout" onChange={handleEventFormChange}>
            <option value="select an option">Select an option:</option>
            <option value="300">5 minutes</option>
            <option value="900">15 minutes</option>
            <option value="1800">30 minutes</option>
            <option value="3600">1 hour</option>
            <option value="7200">2 hours</option>
          </select>
          <input type="submit" className="submit-button"></input>
        </form>
      </div>
    </div>
  );
}
