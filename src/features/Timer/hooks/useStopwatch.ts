import { useEffect, useState, } from "react";

import convertSecondsToTime from "../../WorkLog/functions/convertSecondsToTime";
import { createWorkLog } from "../api/post"
import msSecondsToYYYYMMDDHHMMSS from "../functions/msSecondsToYYYYMMDDHHMMSS";

const userId = 1;

type WorkLogStart = {
  workLogStartSeconds: number;
  workLogStartTime: string;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());

  return `${year}-${month}-${day}`;
}

const formatTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const padZero = (value: number) => {
  return value.toString().padStart(2, '0');
};

const useStopwatch = (): [
  string,
  boolean,
  boolean,
  boolean,
  {
    setSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>,
    setFailAlert: React.Dispatch<React.SetStateAction<boolean>>,
    startHandler: () => void,
    stopHandler: () => void
  }
] => {
  const [displayTime, setDisplayTime] = useState<string>("00:00:00");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [failAlert, setFailAlert] = useState<boolean>(false);
  const [workLogDate, setWorkLogsData] = useState<string>("");
  const [workLogStart, setWorkLogStart] = useState<WorkLogStart>({workLogStartSeconds: 0, workLogStartTime: ""});

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      const stopWatchStartTime = new Date().getTime();
      intervalId = setInterval(() => {
        setDisplayTime(() => {
          let stopWatchElapsedTime = new Date().getTime();
          let seconds = Math.floor((stopWatchElapsedTime - stopWatchStartTime) / 1000);
          return convertSecondsToTime(seconds);
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        setDisplayTime("00:00:00");
      }
    };
  }, [isRunning]);

  const startHandler = () => {
    setIsRunning(true);
    setWorkLogsData(formatDate(new Date()));
    setWorkLogStart({workLogStartSeconds: (new Date()).getTime(), workLogStartTime: formatTime(new Date())});
  }

  const stopHandler = async() => {
    setIsRunning(false);

    const [hours, minutes, seconds] = displayTime.split(":");
    const elapsedTime = (Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds));
    const workLogEndMsSeconds = workLogStart.workLogStartSeconds + (elapsedTime * 1000);
    const workLogEndTime = msSecondsToYYYYMMDDHHMMSS(workLogEndMsSeconds);

    const response = await createWorkLog(
      userId,
      workLogDate,
      workLogStart.workLogStartTime,
      workLogEndTime,
      elapsedTime
    )
    if (response.status === 201) {
      setSuccessAlert(true);
    } else {
      setFailAlert(true);
    }
  }

  return [displayTime, isRunning, successAlert, failAlert, { setSuccessAlert, setFailAlert, startHandler, stopHandler } ];
}

export default useStopwatch;