import convertSecondsToTime from "../../../functions/convertSecondsToTime";

type MonthlyTotalTimeProps = {
  dateSumSeconds: number[];
};

const MonthlyTotalTime: React.FC<MonthlyTotalTimeProps> = ({dateSumSeconds}) => {

  return (
    <table className="w-80 max-w-full">
      <tbody>
        <tr>
          <th className="border-y border-l border-gray-500 px-4 py-2 bg-dark-gray">月合計稼働時間</th>
          <td className="border border-gray-500 px-4 py-2 text-center bg-white">{convertSecondsToTime(dateSumSeconds)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MonthlyTotalTime;