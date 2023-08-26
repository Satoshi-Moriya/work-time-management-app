export type TimeRange = {
  start: number;
  end: number;
};

export type RecordItemLogTimeRange = {
  recordItemLogId: number;
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

export type RecordItemLog = {
  recordItemLogId: number;
  recordItemId: number;
  recordItemLogDate: string;
  recordItemLogStartTime: string;
  recordItemLogEndTime: string;
  recordItemLogSeconds: number;
}

export type ClientWorkLogData = {
  workLogId: number;
  workLogUserId: number;
  date: number;
  day: string;
  workLogTime: TimeRange;
  workLogSeconds: number;
}

export type ClientRecordItemLog = {
  recordItemId: number;
  recordItemLogDate: number;
  recordItemLogDay: string;
  recordItemLogTime: RecordItemLogTimeRange;
  recordItemLogSeconds: number;
}

export type DailyClientWorkLogData = {
  workLogUserId: number;
  date: number;
  day: string;
  workLogTime: TimeRange[];
  workLogSumSeconds: number;
}

export type DailyClientRecordItemLog = {
  recordItemId: number;
  recordItemLogDate: number;
  recordItemLogDay: string;
  recordItemLogTime: RecordItemLogTimeRange[];
  recordItemLogSumSeconds: number;
}

export type FetchMonthlyWorkLogResponse<T> = {
  status: number;
  data: T | null;
}