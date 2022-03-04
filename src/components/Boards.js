// import react and utils
import React from "react";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import anime from "animejs/lib/anime.es.js";

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
  const [open, setOpen] = useState(false);

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
          setOpen(true);
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
          setOpen(true);
        });
      }
      setLoading(false);
    });
  }

  // loading spinner when state is set to true
  if (isLoading) {
    return <Loader />;
  }

  // animations for welcome text using anime.js (import at top)
  anime
    .timeline({
      endDelay: 1000,
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    })
    .add({ targets: ".welcome-animation", color: "#f2cb05" }, 0);

  anime({
    targets: ".welcome-animation",
    translateY: {
      value: 0,
      duration: 2200,
      easing: "easeInSine",
    },
    translateX: {
      value: 250,
      duration: 1200,
      easing: "easeInOutSine",
    },
    rotate: {
      value: 360,
      duration: 2200,
      easing: "easeInOutSine",
    },
    scale: {
      value: 2,
      duration: 2000,
      delay: 800,
      easing: "easeInOutQuart",
    },
    delay: 250, // All properties except 'scale' inherit 250ms delay
  });

  // handles closing error messages
  function handleClose() {
    setOpen(false);
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
        {errors
          ? errors.map((error) => (
              <Snackbar autoHideDuration={6000}>{error}</Snackbar>
            ))
          : null}
      </div>
    );
  }

  // if user has no events, only offer to add new
  if (!events || events.length === 0) {
    return (
      <div className="event-page-container">
        <div className="welcome">
          <p className="welcome-animation">welcome, {user.first_name}</p>
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
          <Tooltip title="add new event board">
            <Icon id="icon-med" onClick={() => setFormPopup(true)}>
              edit_calendar
            </Icon>
          </Tooltip>
        </div>
        <p className="welcome-animation">welcome, {user.first_name}</p>
        <div className="preview-container">
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
        </div>
        <div>
          {errors
            ? errors.map((error) => {
                return (
                  <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message={error}
                  >
                    <MuiAlert variant="filled" severity="error">
                      {error}
                    </MuiAlert>
                  </Snackbar>
                );
              })
            : null}
        </div>
      </div>
    );
}

export default Boards;
