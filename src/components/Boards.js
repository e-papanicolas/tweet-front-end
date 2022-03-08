// import react and utils
import React from "react";
import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// import components
import NewBoardForm from "./NewBoardForm";
import EventPreview from "./EventPreview";
import "../styles/Boards.css";

function Boards({ user, setLoading }) {
  const token = localStorage.getItem("jwt");

  // sets state
  const [formPopup, setFormPopup] = useState(false);
  const [errors, setErrors] = useState([]);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  // fetches users events to store in state
  useEffect(() => {
    fetch(`http://localhost:3000/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, [token]);

  // fetch for creating new event
  function handleCreateNewEvent(e, eventFormData) {
    e.preventDefault();
    setLoading(true);
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
    setLoading(true);
    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
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

  // update event function
  function handleUpdateEvent(e, event) {
    e.preventDefault();
    setLoading(true);
    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            setEvents([...events, data]);
            // set the index where the key is (where you map over EVENTS)
            // Pass along the index for the event that you're updating
            // spread events before and after the one that you're updating
            // setEvents([...events.slice(0, index), data, ...events.slice(index)])
          });
        } else {
          res.json().then((data) => {
            console.log(data);
            setErrors(data.errors);
            setOpen(true);
          });
        }
      })
      .finally(() => setLoading(false));
  }

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

  // if user has boards, map over and render Event component for each, if not display message
  return (
    <div id="boards-container">
      <div className="event-board-title-container">
        <h2>My Event Boards</h2>
        <div className="icon-container-left">
          <Tooltip title="add new event board">
            <Icon id="icon-med" onClick={() => setFormPopup(true)}>
              add_box
            </Icon>
          </Tooltip>
          <p>New event board</p>
        </div>
      </div>
      {!user.events ? (
        <div className="event-page-container">
          <div id="board-container">
            <p>You don't have any boards...</p>
            <p>Click to add one now.</p>
          </div>
        </div>
      ) : (
        <div className="preview-container">
          <div className="previews">
            {events.map((event) => {
              return (
                <EventPreview
                  key={event.id}
                  event={event}
                  handleDeleteEvent={handleDeleteEvent}
                  user={user}
                  handleUpdateEvent={handleUpdateEvent}
                />
              );
            })}
          </div>
        </div>
      )}

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
