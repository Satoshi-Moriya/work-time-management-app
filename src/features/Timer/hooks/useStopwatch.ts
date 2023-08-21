import { useContext, useEffect, useState, } from "react";
import axios from "axios";

import convertSecondsToTime from "../../../functions/convertSecondsToTime";
import { createWorkLog } from "../repository/repository"
import msSecondsToYYYYMMDDHHMMSS from "../functions/msSecondsToYYYYMMDDHHMMSS";
import { AuthContext } from "../../Auth/components/AuthProvider";
import { api } from "../../../lib/api-client/api-client";

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
  {message: string | null, isSuccess: boolean | null },
  {
    setToast: React.Dispatch<React.SetStateAction<{message: string | null, isSuccess: boolean | null }>>,
    startHandler: () => void,
    stopHandler: () => void
  }
] => {
  const [displayTime, setDisplayTime] = useState<string>("00:00:00");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [workLogDate, setWorkLogsData] = useState<string>("");
  const [workLogStart, setWorkLogStart] = useState<WorkLogStart>({workLogStartSeconds: 0, workLogStartTime: ""});
  const [userId] = useContext(AuthContext);
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});

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

    try {
      const csrfToken = await axios.post("http://localhost:8080/csrf");
      const headers = {
        "Content-Type": "application/json;charset=utf-8",
        "X-CSRF-TOKEN": csrfToken.data.token
      };
      await api.post("/work-log", {
        workLogUserId: userId,
        workLogDate: workLogDate,
        workLogStartTime: workLogStart.workLogStartTime,
        workLogEndTime: workLogEndTime,
        workLogSeconds: elapsedTime
      }, {
        headers: headers
      });
      setToast({message: "作業記録が保存されました。", isSuccess: true});
    } catch(error) {
      setToast({message: "予期せぬエラーが発生し、作業記録が保存できませんでした。", isSuccess: false});
    }
  }

  return [displayTime, isRunning, toast, { setToast, startHandler, stopHandler } ];
}

export default useStopwatch;