import React, { useState, useRef, useEffect } from "react";

export default function Countdown({ timeout }) {
  // let Ref;
  let Ref = useRef();
  // if (Ref.current) {
  //   Ref = Ref.current;
  // } else {
  //   Ref = myRef;
  // }

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

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
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
    // if (timeout === 300) {
    //   setTimer("00:05:00");
    // } else if (timeout === 900) {
    //   setTimer("00:15:00");
    // } else if (timeout === 1800) {
    //   setTimer("00:30:00");
    // } else if (timeout === 3600) {
    //   setTimer("01:00:00");
    // } else if (timeout === 7200) {
    //   setTimer("02:00:00");
    // } else {
    //   setTimer("00:00:00");
    // }
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
      Ref.current = Ref.current - 1;
      console.log(Ref.current);
      return function () {
        clearInterval(id);
      };
    }, 1000);
  };

  const getDeadTime = () => {
    let deadline = new Date();
    if (Ref.current) {
      deadline.setSeconds(deadline.getSeconds() + Ref.current);
    } else {
      deadline.setSeconds(deadline.getSeconds() + timeout);
    }
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
