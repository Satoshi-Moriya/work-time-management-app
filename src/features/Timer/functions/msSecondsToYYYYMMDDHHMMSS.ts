const msSecondsToYYYYMMDDHHMMSS = (msSeconds: number): string => {
  const convertDate = new Date(msSeconds);
  const yyyy = convertDate.getFullYear();
  const MM = (convertDate.getMonth() + 1).toString().padStart(2, "0")
  const dd = convertDate.getDate().toString().padStart(2, "0")
  const HH = convertDate.getHours().toString().padStart(2, "0")
  const mm = convertDate.getMinutes().toString().padStart(2, "0")
  const ss = convertDate.getSeconds().toString().padStart(2, "0");

  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}

export default msSecondsToYYYYMMDDHHMMSS;