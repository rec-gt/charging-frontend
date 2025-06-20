import { LineChart } from "@mui/x-charts/LineChart";
import React from "react";
import { LANG, LANG_OBJ } from "../../utils";

type LineChartPlateProps = {
  title: string;
  icon?: any;
  series?: any;
};

export const LineChartPlate: React.FC<LineChartPlateProps> = (props) => {
  const { title, icon, series } = props;
  return (
    <div className="w-full h-full flex flex-col items-center rounded-xl border-[2px] border-[#ccc]">
      <div className="relative w-full flex justify-between">
        <div className="px-4 w-full text-center">{title}</div>
        {icon && <div className="absolute top-0 right-0">{icon}</div>}
      </div>
      <div className="w-full h-full">
        <LineChart className="w-full h-full" series={series} />
      </div>
    </div>
  );
};
