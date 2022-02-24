import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { UserContext } from "../App";
import { useContext } from "react";
import Icon from "@mui/material/Icon";

export default function Event({ event, setEventPage }) {
  const user = useContext(UserContext);
  const token = localStorage.getItem("jwt");
  const channelObj = {
    channel: "TweetChannel",
    event: "1492913662872465411",
  };

  function handleClick() {
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

  return (
    // <ActionCableConsumer channel={channelObj} onReceived={console.log}>
    //   <button onClick={handleClick}>test cable</button>
    // </ActionCableConsumer>
    <div>
      <div>
        <Icon className="icon-s" onClick={() => setEventPage(false)}>
          clear
        </Icon>
      </div>
      <div>
        <h2>{event.name}</h2>
        <h2>#{event.hashtag}</h2>
      </div>
    </div>
  );
}
