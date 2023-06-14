export type TimeRange = {
  start: number;
  end: number;
};


export type WorkLogsData = {
  date: number;
  time: TimeRange[];
  sumSeconds: number;
}