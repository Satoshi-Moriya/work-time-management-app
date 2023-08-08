export const convertTimeToSeconds = (dateTimeString: string) => {
  console.log(dateTimeString);
  const [hours, minutes, seconds] = dateTimeString
    .substring(dateTimeString.length - 8)
    .split(":")
    .map(Number);
  const totalSeconds = hours * 3600 +  minutes * 60 + seconds;
  return totalSeconds;
}