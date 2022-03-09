import React, { useState, useRef, useEffect } from "react";

export default function Countdown({ timeout }) {
  const Ref = useRef();

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the begining of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };
  const clearTimer = (e) => {
    if (timeout === 300) {
      setTimer("00:05:00");
    } else if (timeout === 900) {
      setTimer("00:15:00");
    } else if (timeout === 1800) {
      setTimer("00:30:00");
    } else if (timeout === 3600) {
      setTimer("01:00:00");
    } else if (timeout === 7200) {
      setTimer("02:00:00");
    } else {
      setTimer("00:00:00");
    }

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    // if (Ref.current) clearInterval(Ref.current);
    // const prev = Ref.current;
    console.log(Ref);
    console.log(Ref.current);
    const id = setInterval(() => {
      console.log("starting timer");
      startTimer(e);
    }, 1000);
    Ref.current = id;
    console.log(id);
    console.log(Ref.current);
  };

  const getDeadTime = () => {
    let deadline = new Date();
    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + timeout);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <div>
      <h2>{timer}</h2>
    </div>
  );
}
