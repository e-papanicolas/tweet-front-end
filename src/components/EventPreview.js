// import react and utils
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EventPreview({ event }) {
  const navigate = useNavigate();
  return (
    <div className="event-preview">
      <h2>{event.name}</h2>
      <h2>#{event.hashtag}</h2>
      <button onClick={() => navigate(`/myevents/${event.id}`)}>view</button>
    </div>
  );
}
