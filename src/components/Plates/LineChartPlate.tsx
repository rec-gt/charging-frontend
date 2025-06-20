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
    <div className="w-full h-full flex flex-col items-center rounded-xl border-[2px] border-[#ccc]">
      <div className="relative w-full flex justify-between">
        <div className="px-4 w-full text-center">{title}</div>
        {icon && <div className="absolute top-0 right-0">{icon}</div>}
      </div>
      <div className="w-full h-full">
        <LineChart
          className="w-full h-full"
          series={[
            { curve: "linear", data: [1, 5, 2, 6, 3, 9.3] },
            { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
          ]}
        />
      </div>
    </div>
  );
};
