const convertTimeToSeconds = (dateTimeString: string) => {
  const [hours, minutes, seconds] = dateTimeString
    .substring(dateTimeString.length - 8)
    .split(":")
    .map(Number);
  const totalSeconds = hours * 3600 +  minutes * 60 + seconds;
  return totalSeconds;
}

export default convertTimeToSeconds;