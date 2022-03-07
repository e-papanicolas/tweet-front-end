// import react and utils
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Boards.css";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

export default function EventPreview({ event, handleDeleteEvent }) {
  const navigate = useNavigate();
  return (
    <div className="event-preview">
      <div className="preview-titles-container">
        <div className="preview-titles">
          <h2>
            Event / <span className="bold">{event.name}</span>
          </h2>
        </div>
        <div className="preview-hashtags">
          <h2>
            Hashtag / <span className="bold">#{event.hashtag}</span>
          </h2>
        </div>
      </div>
      <div className="center">
        <Tooltip title="view event" placement="bottom">
          <p
            className="open-event-button"
            onClick={() => navigate(`/myevents/${event.id}`)}
          >
            open event
          </p>
        </Tooltip>
      </div>
      <div className="preview-buttons">
        <Tooltip title="delete" placement="bottom">
          <Icon
            className="red"
            id="pb"
            onClick={() => handleDeleteEvent(event)}
          >
            delete_forever
          </Icon>
        </Tooltip>
        <Tooltip title="edit" placement="bottom">
          <Icon className="blue" id="pb">
            edit
          </Icon>
        </Tooltip>
      </div>
    </div>
  );
}
