const convertSecondsToTime = <T extends number | number[] >(convertSeconds: T): string => {
  const convertSumSeconds: number = Array.isArray(convertSeconds) ?  convertSeconds.reduce((sum, element) => sum + element, 0) : convertSeconds;
  if (!convertSumSeconds || convertSumSeconds === 0) {
    return "00:00:00";
  }
  const calculateSumHour = Math.floor(convertSumSeconds / 3600);
  const calculateSumMin = Math.floor(convertSumSeconds % 3600 / 60);
  const remainSumMin = convertSumSeconds % 60;
  const displayHour = calculateSumHour.toString().padStart(2, "0");
  const displayMin = calculateSumMin.toString().padStart(2, "0");
  const displaySeconds = remainSumMin.toString().padStart(2, "0");

  return `${displayHour}:${displayMin}:${displaySeconds}`;
};

export default convertSecondsToTime;