import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}/${month}/${day}/${hours}:${minutes}:${seconds}`;
  }

  const padZero = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="px-4 w-[200px]">
      <time>{formatTime(time)}</time>
    </div>
  );
}

export default Clock;