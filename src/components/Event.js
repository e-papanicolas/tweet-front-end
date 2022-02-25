// import react and utils
import React from "react";
import { ActionCableProvider } from "react-actioncable-provider";
import { ActionCableConsumer } from "react-actioncable-provider";
import ActionCable from "actioncable";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { UserContext } from "../App";
// import { useContext } from "react";
import Icon from "@mui/material/Icon";

export default function Event({ user }) {
  let { eventId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  // sets state
  const [tweets, setTweets] = useState([]);
  const [event, setEvent] = useState({
    hashtag: "",
    id: eventId,
    name: "",
    rule_id: "",
  });

  // fetches the event and starts stream
  useEffect(() => {
    fetch(`http://localhost:3000/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setTweets(data.tweets);
        console.log(data);
      })
      .catch(console.error);
  }, [token, eventId]);

  // TODO: update so that event is using rule id returned from backend on create
  const channelObj = {
    channel: "TweetChannel",
    rule: event.rule_id,
  };

  // TODO: add consumer back in and channel obj and create onrecieved function to add tweet to state holding array of tweets render tweet for each
  // render event
  return (
    <ActionCableProvider url="ws://localhost:3000/cable">
      <div id="event-page">
        <ActionCableConsumer channel={channelObj} onReceived={console.log}>
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
              onClick={() => navigate(`/myevents`)}
            >
              clear
            </Icon>
          </div>
        </ActionCableConsumer>
      </div>
    </ActionCableProvider>
  );
}
