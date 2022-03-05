// import react and utils
import React from "react";
import { ActionCableProvider } from "react-actioncable-provider";
import { ActionCableConsumer } from "react-actioncable-provider";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../styles/Event.css";
import anime from "animejs/lib/anime.es.js";

// import components
import Tweet from "./Tweet";
import Loader from "./Loader";

export default function Event({ user }) {
  let { eventId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  // sets state
  const [tweets, setTweets] = useState([]);
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [event, setEvent] = useState({
    hashtag: "",
    id: eventId,
    name: "",
    rule_id: "",
    timeout: "",
  });

  // fetches the event and loads info on page
  useEffect(() => {
    setLoading(!isLoading);
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
          setOpen(true);
        });
      }
      setLoading(false);
    });
  }, [token, eventId]);

  // sends request to back end to start streaming from twitter
  function startStream() {
    console.log("clicked");
    fetch(`http://localhost:3000/streamstart/${event.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // disables the start streaming button to avoid sending requests
    // and interrupting the stream
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, event.timeout * 1000);
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
        newTweet.isNew = true;
        setTweets([...tweets, newTweet]);
        animate(newTweet);
      }
    }
  }

  // tweet animation using anime.js
  function animate(newTweet) {
    anime({
      targets: [tweets, ".the-tweet"],
      translateY: {
        value: [1000, 0],
        duration: 2200,
        easing: "easeInSine",
      },
      rotate: {
        value: 720,
        duration: 2200,
        easing: "easeInOutSine",
      },
    });
    newTweet.isNew = false;
  }

  // handles closing error messages
  function handleClose() {
    setOpen(false);
  }

  // loading spinner when state is set to true
  if (isLoading) {
    return <Loader />;
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
            <Tooltip title="close">
              <Icon
                className="icon-s close-button"
                onClick={() => navigate(`/myevents`)}
              >
                clear
              </Icon>
            </Tooltip>
          </div>

          <div className="start-stream">
            <button disabled={disabled} onClick={startStream}>
              start streaming now
            </button>
          </div>
          <div id="tweet-container">
            {tweets.map((tweet) => {
              return <Tweet key={tweet.data.id} tweet={tweet} />;
            })}
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
        </ActionCableConsumer>
      </div>
    </ActionCableProvider>
  );
}
