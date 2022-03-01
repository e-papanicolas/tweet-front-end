// import react and utils
import React from "react";
import { ActionCableProvider } from "react-actioncable-provider";
import { ActionCableConsumer } from "react-actioncable-provider";
import ActionCable from "actioncable";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import Tweet from "./Tweet";
import "../styles/Event.css";

export default function Event({ user }) {
  let { eventId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  // sets state
  const [tweets, setTweets] = useState([]);
  const [errors, setErrors] = useState([]);
  const [event, setEvent] = useState({
    hashtag: "",
    id: eventId,
    name: "",
    rule_id: "",
    timeout: "",
  });

  // fetches the event and loads info on page
  useEffect(() => {
    fetch(`http://localhost:3000/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setEvent(data);
          setTweets(data.tweets);
          console.log(data);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  }, [token, eventId]);

  // sends request to back end to start streaming from twitter
  function startStream() {
    fetch(`http://localhost:3000/streamstart/${event.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // lets the back end know the channel to broadcast on
  const channelObj = {
    channel: "TweetChannel",
    rule: event.rule_id,
  };

  // recieves data from websocket, filters out broadcasts that arent tweets
  // creates a new tweet out of the response and adds it to the tweet array
  // which triggers state and it appears on the page
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
            <h2>
              <span className="hashtag">#</span>
              {event.hashtag}
            </h2>
            {/* <Icon id="icon-med" className="send-button">
              send
            </Icon> */}
            {/* TODO: add click handler to share */}
          </div>
          <div>
            <Icon
              className="icon-s close-button"
              onClick={() => navigate(`/myevents`)}
            >
              clear
            </Icon>
          </div>

          <div className="start-stream">
            <button onClick={startStream}>start streaming now</button>
          </div>
          <div id="tweet-container">
            {tweets.map((tweet) => {
              return <Tweet key={tweet.data.id} tweet={tweet} />;
            })}
          </div>
          <div>{errors ? errors.map((error) => <p>error</p>) : null}</div>
        </ActionCableConsumer>
      </div>
    </ActionCableProvider>
  );
}
