const WEEK = ["日", "月", "火", "水", "木", "金", "土"];

export const getWeekdayFromDate = (dateString: string): string => WEEK[new Date(dateString).getDay()];