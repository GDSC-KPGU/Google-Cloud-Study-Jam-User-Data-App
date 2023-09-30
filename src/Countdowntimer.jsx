import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
    const targetDate = new Date('2023-10-02T22:30:00+05:30');


  const currentDate = new Date();

  // Calculate the time difference
  const timeDifference = targetDate - currentDate;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  const [remainingTime, setRemainingTime] = useState({
    days,
    hours,
    minutes,
    seconds,
  });

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      const currentTime = new Date();
      const newTimeDifference = targetDate - currentTime;

      // Calculate updated days, hours, minutes, and seconds
      const newDays = Math.floor(newTimeDifference / (1000 * 60 * 60 * 24));
      const newHours = Math.floor((newTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const newMinutes = Math.floor((newTimeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const newSeconds = Math.floor((newTimeDifference % (1000 * 60)) / 1000);

      setRemainingTime({
        days: newDays,
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds,
      });

      // Check if the target date has passed, and clear the interval
      if (newTimeDifference <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="countdown-timer bg-gray-900">
      <div className="countdown-item">
        <span className="countdown-value">{remainingTime.days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{remainingTime.hours}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{remainingTime.minutes}</span>
        <span className="countdown-label">Minutes</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{remainingTime.seconds}</span>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
