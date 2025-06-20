import { LineChart } from "@mui/x-charts/LineChart";
import React from "react";

type LineChartPlateProps = {
  title: string;
  value: number;
  text: string;
  color: string;
  icon?: any;
};

export const LineChartPlate: React.FC<LineChartPlateProps> = (props) => {
  const { title, value, text, color, icon } = props;
  return (
    <div className="flex flex-col items-center rounded-xl border-[2px] border-[#ccc]">
      <div className="relative w-full flex justify-between">
        <div className="w-full">{title}</div>
        {icon && <div className="absolute top-0 right-0">{icon}</div>}
      </div>
      <div className="w-full h-[75px]">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={300}
        />
      </div>
    </div>
  );
};
