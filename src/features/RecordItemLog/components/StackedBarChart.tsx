import React from "react";

import { TimeRange } from "../types";

type StackedBarChartProps = {
  timeData: TimeRange[];
};

const DATE_SECONDS = 60 * 60 * 24; // 86400秒
const CHART_WIDTH = 800;

const StackedBarChart: React.FC<StackedBarChartProps> = ({timeData}) => {

  return (
    <>
      {timeData.map((time, index) => (
        <div
          key={index}
          className="bg-[#BAD3FF] h-8 absolute inline-block top-1/2 -translate-y-1/2"
          style={{
            left: `${(time.start / DATE_SECONDS) * 100}%`,
            width: `${((time.end - time.start) / DATE_SECONDS) * CHART_WIDTH}px`
          }}
        ></div>
      ))}
    </>
  );
};

export default StackedBarChart;