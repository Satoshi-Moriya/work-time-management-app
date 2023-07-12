import { useEffect, useState } from "react";
import {Client, Frame, over} from "stompjs";
import SockJS from "sockjs-client";

export type Stopwatch = {
  userId: number;
  date: string;
  startTime: number;
  endTime: number;
  elapsedTime: number;
  isRunning: boolean;
};

const userId = "1";
let stompClient: Client | null = null;

const StopWatch = () => {
  const [time, setTime] = useState({hours: 0, minutes: 0, seconds: 0});
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    connect()

    const pageChangeHandler = (event: BeforeUnloadEvent) => {
      if (isRunning) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", pageChangeHandler);

    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log("Disconnecting...");
        });
      }
      window.removeEventListener("beforeunload", pageChangeHandler);
    };
  }, []);

  const connect = async() => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    if (stompClient) {
      stompClient.subscribe(`/display/stopwatch/${userId}`, nowTimeReceived);
    }
  }

  const nowTimeReceived = (payload: Frame) => {
    const payloadData = JSON.parse(payload.body);
    showNowStopwatch(payloadData);
  }

  const onError = (err: Frame | string) => {
    console.log(err);
  }

  const showNowStopwatch = (stopwatch: Stopwatch) => {
    const msToSeconds = stopwatch.elapsedTime;
    const hours = Math.floor(msToSeconds / 3600);
    const minutes = Math.floor(msToSeconds % 3600 / 60);
    const seconds = msToSeconds % 60;
    setTime({hours, minutes, seconds});
  }

  const startHandler = () => {
    setIsRunning(true);
    if (stompClient) {
      stompClient.send(`/app/start/${userId}`, {}, JSON.stringify({"userId": userId}));
    }
  }

  const stopHandler = () => {
    setIsRunning(false);
    if (stompClient) {
      stompClient.send(`/app/stop/${userId}`, {}, JSON.stringify({"userId": userId}));
    }
  }

  return (
    <>
      <p className="text-9xl tabular-nums" id="stopwatch">
        <span>{`${time.hours.toString().padStart(2, "0")}:`}</span>
        <span>{`${time.minutes.toString().padStart(2, "0")}:`}</span>
        <span>{`${time.seconds.toString().padStart(2, "0")}`}</span>
      </p>
      <div className="mt-20 flex">
        <button disabled={isRunning} onClick={startHandler} className="bg-dark-gray py-3 px-5 rounded-lg text-xl hover:opacity-50 focus:opacity-50 mx-3  disabled:opacity-50 disabled:cursor-not-allowed">業務開始</button>
        <button disabled={!isRunning} onClick={stopHandler} className="bg-dark-gray py-3 px-5 rounded-lg text-xl hover:opacity-50 focus:opacity-50 mx-3  disabled:opacity-50 disabled:cursor-not-allowed">業務終了</button>
      </div>
    </>
  );
}

export default StopWatch;