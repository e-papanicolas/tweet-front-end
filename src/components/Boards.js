// import react and utils
import React from "react";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// import components
import NewBoardForm from "./NewBoardForm";
import EventPreview from "./EventPreview";
import Loader from "./Loader";
import "../styles/Boards.css";

function Boards({ user }) {
  const token = localStorage.getItem("jwt");

  // sets state
  const [formPopup, setFormPopup] = useState(false);
  const [errors, setErrors] = useState([]);
  const [events, setEvents] = useState(user.events);
  const [isLoading, setLoading] = useState(false);

  // fetch for creating new event
  function handleCreateNewEvent(e, eventFormData) {
    e.preventDefault();
    setLoading(!isLoading);
    fetch(`http://localhost:3000/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventFormData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          setFormPopup(!formPopup);
          setEvents([...events, data]);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
      setLoading(false);
    });
  }

  // deletes event from db, updates state to remove it from the page
  // deletes rule from twitter stream also
  function handleDeleteEvent(event) {
    setLoading(!isLoading);
    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setEvents(data);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
      setLoading(false);
    });
  }

  // loading spinner when state is set to true
  if (isLoading) {
    return <Loader />;
  }

  // renders new form popup when button is clicked
  if (formPopup) {
    return (
      <div className="new-board-form-container">
        <NewBoardForm
          user={user}
          setFormPopup={setFormPopup}
          handleCreateNewEvent={handleCreateNewEvent}
        />
        {errors ? errors.map((e) => <div>{e}</div>) : null}
      </div>
    );
  }

  // if user has no events, only offer to add new
  if (!events || events.length === 0) {
    return (
      <div className="event-page-container">
        <div className="welcome">
          <p>welcome, {user.first_name}</p>
        </div>
        <div id="board-container">
          <p>You don't have any boards...</p>
          <p>Click to add one now.</p>
          <div className="icon-container">
            <Tooltip title="add new event board">
              <Icon id="icon-large" onClick={() => setFormPopup(true)}>
                edit_calendar
              </Icon>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }

  // if user has boards, map over and render Event component for each
  else
    return (
      <div id="boards-container">
        <div className="welcome">
          <p>welcome, {user.first_name}</p>
          <Tooltip title="add new event board">
            <Icon id="icon-med" onClick={() => setFormPopup(true)}>
              edit_calendar
            </Icon>
          </Tooltip>
        </div>
        <div className="previews">
          {events.map((event) => {
            return (
              <EventPreview
                event={event}
                key={event.id}
                handleDeleteEvent={handleDeleteEvent}
              />
            );
          })}
        </div>
        <div>{errors ? errors.map((error) => <p>{error}</p>) : null}</div>
      </div>
    );
}

export default Boards;
