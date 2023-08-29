export type TimeRange = {
  start: number;
  end: number;
};

export type RecordItemLogTimeRange = {
  recordItemLogId: number;
  start: number;
  end: number;
};

export type RecordItemLogType = {
  recordItemLogId: number;
  recordItemId: number;
  recordItemLogDate: string;
  recordItemLogStartTime: string;
  recordItemLogEndTime: string;
  recordItemLogSeconds: number;
}

export type ClientRecordItemLog = {
  recordItemId: number;
  recordItemLogDate: number;
  recordItemLogDay: string;
  recordItemLogTime: RecordItemLogTimeRange;
  recordItemLogSeconds: number;
}

export type DailyClientRecordItemLog = {
  recordItemId: number;
  recordItemLogDate: number;
  recordItemLogDay: string;
  recordItemLogTime: RecordItemLogTimeRange[];
  recordItemLogSumSeconds: number;
}