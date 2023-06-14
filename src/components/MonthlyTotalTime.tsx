type MonthlyTotalTimeProps = {
  dateSumSeconds: number[];
}

const MonthlyTotalTime: React.FC<MonthlyTotalTimeProps> = ({dateSumSeconds}) => {

  const createDisplayTime = (dateSumSeconds: number[]): string => {
    if (!dateSumSeconds || dateSumSeconds.length === 0) {
      return "00:00";
    }
    const calculateSumSeconds = dateSumSeconds.reduce((sum, element) => sum + element, 0);
    const calculateSumHour = Math.floor(calculateSumSeconds / 3600);
    const calculateSumMin = Math.floor(calculateSumSeconds % 3600 / 60);
    const displayHour = calculateSumHour.toString();
    const displayMin = calculateSumMin.toString().padStart(2, "0");

    return `${displayHour}:${displayMin}`;
  }

  return (
    <table className="w-80">
      <tbody>
        <tr>
          <th className="border-y border-l border-gray-500 px-4 py-2 bg-dark-gray">月合計稼働時間</th>
          <td className="border border-gray-500 px-4 py-2 text-center bg-white">{createDisplayTime(dateSumSeconds)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default MonthlyTotalTime;