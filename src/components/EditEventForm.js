// import react and utils
import React from "react";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

export default function EditEventForm({
  event,
  user,
  handleUpdateEvent,
  setEditingEvent,
  index,
  removeSpacesFromHashtag,
}) {
  // sets state of form with current values so that if user
  // leaves them blank it doesn't get overwritten
  const [eventFormData, setEventFormData] = useState({
    user_id: user.id,
    name: event.name,
    hashtag: event.hashtag,
    timeout: event.timeout,
    rule_id: event.rule_id,
    id: event.id,
    index: index,
  });

  // handles input changes on form and sets in state
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

  // renders form to update event board
  return (
    <div className="event-preview">
      <div className="event-edit-container">
        <div className="closing-flex">
          <div className="preview-header">
            <h2>Update event board</h2>
          </div>
          <div>
            <Tooltip title="close">
              <Icon className="icon-s" onClick={() => setEditingEvent(false)}>
                clear
              </Icon>
            </Tooltip>
          </div>
        </div>
        <div className="edit-event-content">
          <form
            onSubmit={(e) => {
              setEditingEvent(false);
              handleUpdateEvent(e, eventFormData);
            }}
          >
            <div className="preview-titles">
              <h2>Event / </h2>
              <input name="name" onChange={handleEventFormChange}></input>
            </div>
            <div className="preview-hashtags">
              <h2>Hashtag / </h2>
              <input name="hashtag" onChange={handleEventFormChange}></input>
            </div>
            <div className="select-menu">
              <h2>Streaming/ </h2>
              <select name="timeout" onChange={handleEventFormChange}>
                <option value="select an option">Select one:</option>
                <option value="300">5 minutes</option>
                <option value="900">15 minutes</option>
                <option value="1800">30 minutes</option>
                <option value="3600">1 hour</option>
                <option value="7200">2 hours</option>
              </select>
            </div>
            <div className="submit-container">
              <input type="submit" className="submit-button"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
