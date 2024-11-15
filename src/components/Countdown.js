"use client";

import * as React from "react";
import styles from "./Countdown.module.css";

const formatCount = (count) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(count);

const Counter = ({ count, label, inline = false }) => (
  <div
    className={[styles.Counter, inline && styles.CounterInline]
      .filter(Boolean)
      .join(" ")}
  >
    <div className="count">{formatCount(count)}</div>
    <div className="label">{label}</div>
  </div>
);

const Countdown = ({ title, until, inline = false }) => {
  const calculateTimeLeft = () => {
    const targetDate = new Date(until);
    const currentDate = new Date();
    const difference =
      targetDate > currentDate
        ? targetDate - currentDate
        : currentDate - targetDate;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  if (inline) {
    return (
      <div
        className={[styles.Countdown, inline && styles.CountdownInline]
          .filter(Boolean)
          .join(" ")}
      >
        {timeLeft.days > 0 && (
          <Counter count={timeLeft.days} label="days" inline />
        )}
        {timeLeft.hours > 0 && (
          <Counter count={timeLeft.hours} label="hours" inline />
        )}
        {timeLeft.minutes > 0 && (
          <Counter count={timeLeft.minutes} label="minutes" inline />
        )}
        <Counter count={timeLeft.seconds} label="seconds" inline />
      </div>
    );
  }

  return (
    <div className={styles.CountdownContainer}>
      <h2 style={{ marginBottom: "1rem" }}>{title}</h2>
      <div className={styles.Countdown}>
        {timeLeft.days > 0 && <Counter count={timeLeft.days} label="days" />}
        {timeLeft.hours > 0 && <Counter count={timeLeft.hours} label="hours" />}
        {timeLeft.minutes > 0 && (
          <Counter count={timeLeft.minutes} label="minutes" />
        )}
        <Counter count={timeLeft.seconds} label="seconds" />
      </div>
    </div>
  );
};

export default Countdown;
