import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";

export default function Event() {
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
    <ActionCableConsumer channel={channelObj} onReceived={console.log}>
      <button onClick={handleClick}>test cable</button>
    </ActionCableConsumer>
  );
}
