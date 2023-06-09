import { useEffect, useState } from "react";

const StopWatch = () => {
  const [time, setTime] = useState({hours: 0, minutes: 0, seconds: 0});
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;
          seconds++;

          if (seconds === 60) {
            seconds = 0;
            minutes++;
          }

          if (minutes === 60) {
            minutes = 0;
            hours++;
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    }

    const pageChangeHandler = (event: BeforeUnloadEvent) => {
      if (isRunning) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", pageChangeHandler);

    return () => {
      window.removeEventListener("beforeunload", pageChangeHandler);

      if (intervalId) {
        clearInterval(intervalId);
        setTime({hours: 0, minutes: 0, seconds: 0});
      }
    };
  }, [isRunning]);

  const startHandler = () => {
    setIsRunning(true);
  }

  const stopHandler = () => {
    setIsRunning(false);
  }

  return (
    <>
      <p className="text-9xl">
        <span>{`${time.hours.toString().padStart(2, "0")}:`}</span>
        <span>{`${time.minutes.toString().padStart(2, "0")}:`}</span>
        <span>{`${time.seconds.toString().padStart(2, "0")}`}</span>
      </p>
      <div className="mt-20 flex">
        <button disabled={isRunning} onClick={startHandler} className="bg-dark-gray py-3 px-5 rounded-lg text-xl hover:opacity-50 focus:opacity-50 mx-3">業務開始</button>
        <button disabled={!isRunning} onClick={stopHandler} className="bg-dark-gray py-3 px-5 rounded-lg text-xl hover:opacity-50 focus:opacity-50 mx-3">業務終了</button>
      </div>
    </>
  );
}

export default StopWatch;