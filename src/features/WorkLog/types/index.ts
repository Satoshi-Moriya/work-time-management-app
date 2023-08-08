export type TimeRange = {
  start: number;
  end: number;
};

export type WorkLogData = {
  workLogId: number;
  workLogUserId: number;
  workLogDate: string;
  workLogStartTime: string;
  workLogEndTime: string;
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

export type FetchMonthlyWorkLogResponse<T> = {
  status: number;
  data: T | null;
}