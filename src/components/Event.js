// import react and utils
import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { useState } from "react";
// import { UserContext } from "../App";
// import { useContext } from "react";
import Icon from "@mui/material/Icon";

export default function Event({ event, setEventPage, user }) {
  // const user = useContext(UserContext);
  const token = localStorage.getItem("jwt");
  const [tweets, setTweets] = useState([]);

  // TODO: update so that event is using rule id returned from backend on create
  const channelObj = {
    channel: "TweetChannel",
    event: "1492913662872465411",
  };

  // TODO: figure out what needs to be sent in body, or does this need to be in the board page create event?
  function handleStartStream() {
    fetch(`http://localhost:3000/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "test",
      }),
    });
  }

  // TODO: add consumer back in and channel obj and create onrecieved function to add tweet to state holding array of tweets render tweet for each
  // render event
  return (
    // <ActionCableConsumer channel={channelObj} onReceived={console.log}>
    //   <button onClick={handleClick}>test cable</button>
    // </ActionCableConsumer>
    <div id="event-page">
      <div className="event-title">
        <h2>{event.name}</h2>
        <h2>#{event.hashtag}</h2>
        <Icon id="icon-med" className="send-button">
          send
        </Icon>
      </div>
      {/* TODO: add click handler to share */}
      <div>
        <Icon
          className="icon-s close-button"
          onClick={() => setEventPage(false)}
        >
          clear
        </Icon>
      </div>
    </div>
  );
}
