export type TimeRange = {
  start: number;
  end: number;
};

export type WorkLogData = {
  workLogId: number;
  workLogUserId: number;
  date: number;
  workLogTime: TimeRange;
  workLogSeconds: number;
}

export type ClientWorkLogData = {
  workLogId: number;
  workLogUserId: number;
  date: number;
  day: string;
  workLogTime: TimeRange;
  workLogSeconds: number;
}

export type DailyClientWorkLogData = {
  workLogUserId: number;
  date: number;
  day: string;
  workLogTime: TimeRange[];
  workLogSumSeconds: number;
}