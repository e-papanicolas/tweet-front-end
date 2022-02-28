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
import Tweet from "./Tweet";

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

  function startStream() {
    fetch(`http://localhost:3000/streamstart/${event.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // TODO: update so that event is using rule id returned from backend on create
  const channelObj = {
    channel: "TweetChannel",
    rule: event.rule_id,
  };

  function handleRecieveData(data) {
    if (data.body !== "starting twitter streaming") {
      const res = JSON.parse(data.body);
      console.log(res);
      if (res.body !== "\r\n") {
        const newTweet = res;
        setTweets([...tweets, newTweet]);
      }
    }
  }
  // render event
  return (
    <ActionCableProvider url="ws://localhost:3000/cable">
      <div id="event-page">
        <ActionCableConsumer
          channel={channelObj}
          onReceived={handleRecieveData}
        >
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

          <div>
            <button onClick={startStream}>start stream</button>
          </div>
          <div id="tweet-container">
            {tweets.map((tweet) => {
              return <Tweet key={tweet.data.id} tweet={tweet} />;
            })}
          </div>
        </ActionCableConsumer>
      </div>
    </ActionCableProvider>
  );
}
