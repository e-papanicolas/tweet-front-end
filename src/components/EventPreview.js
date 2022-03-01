// import react and utils
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Boards.css";
import Icon from "@mui/material/Icon";

export default function EventPreview({ event, handleDeleteEvent }) {
  const navigate = useNavigate();
  return (
    <div className="event-preview">
      <div className="preview-titles">
        <h2>{event.name}</h2>
        <h2>#{event.hashtag}</h2>
      </div>
      <div className="preview-buttons">
        <Icon className="pb blue" onClick={() => navigate(`/myevents/${event.id}`)}>
          visibility
        </Icon>
        <Icon className="pb red" onClick={() => handleDeleteEvent(event)}>
          delete_forever
        </Icon>
      </div>
    </div>
  );
}
