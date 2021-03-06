// import react and utils
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../styles/Event.css";
import anime from "animejs/lib/anime.es.js";
import { createConsumer } from "@rails/actioncable";

// import components
import Tweet from "./Tweet";

export default function Event() {
  let { eventId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const cable = useRef();

  // sets state
  const [tweets, setTweets] = useState([]);
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // event is not getting passed down through props, it has a useEffect to get the data
  // each page has its own route - usinng useParams for its event id
  const [event, setEvent] = useState({
    hashtag: "",
    id: eventId,
    name: "",
    rule_id: "",
    timeout: "",
  });

  // sets action cable subscription for web sockets
  useEffect(() => {
    if (!cable.current) {
      cable.current = createConsumer("ws://localhost:3000/cable");
    }

    // lets the back end know the channel to broadcast on
    const channelObj = {
      channel: "TweetChannel",
      rule: event.rule_id,
    };

    // tweet animation using anime.js
    function animate(newTweet) {
      anime({
        targets: [tweets, ".the-tweet"],
        translateY: {
          value: [1000, 0],
          duration: 3200,
          easing: "easeOutBounce",
        },
        rotate: {
          value: 720,
          duration: 3200,
          easing: "easeInOutSine",
        },
      });
      newTweet.isNew = false;
    }

    const handlers = {
      received(data) {
        console.log(data);
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
      },
      connected() {
        console.log("connected");
      },
      disconnected() {
        console.log("disconnected");
        cable.current = null;
      },
    };

    const subscription = cable.current.subscriptions.create(
      channelObj,
      handlers
    );

    return function cleanup() {
      subscription.unsubscribe();
      cable.current = null;
    };
  }, [event.rule_id, tweets]);

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
          setOpen(true);
        });
      }
    });
  }, [token, eventId]);

  // sends request to back end to start streaming from twitter filtered stream endpoint
  function startStream() {
    console.log("starting stream");
    fetch(`http://localhost:3000/streamstart/${event.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // disables the start streaming button to avoid sending requests
    // and disrupting the stream
    setDisabled(true);
    const timeoutId = setTimeout(() => {
      setDisabled(false);
    }, event.timeout * 1000);
    return () => clearTimeout(timeoutId);
  }

  // handles closing error messages
  function handleClose() {
    setOpen(false);
  }

  // render event page
  return (
    <div id="event-page">
      <Tooltip title="close">
        <Icon
          className="icon-s close-button"
          onClick={() => navigate(`/myevents`)}
        >
          clear
        </Icon>
      </Tooltip>
      <div className="event-header">
        <div className="event-title">
          <h2>{event.name}</h2>
          <h3>
            <span className="hashtag">#</span>
            {event.hashtag}
          </h3>
        </div>

        <div className="start-stream">
          <button disabled={disabled} onClick={startStream}>
            Start the TweetStream
          </button>
        </div>
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
    </div>
  );
}
