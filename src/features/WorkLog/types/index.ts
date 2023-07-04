export type TimeRange = {
  start: number;
  end: number;
};

export type WorkLogData = {
  workLogId: number;
  workLogUserId: number;
  date: number;
  day: string;
  workLogTime: TimeRange;
  workLogSeconds: number;
}

export type WorkLogsData = {
  workLogUserId: number;
  date: number;
  day: string;
  workLogTime: TimeRange[];
  workLogSumSeconds: number;
}