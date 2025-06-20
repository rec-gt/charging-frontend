import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React from "react";

type GaugePlateProps = {
  title: string;
  value: number;
  text: string;
  color: string;
  icon?: any;
};

export const GaugePlate: React.FC<GaugePlateProps> = (props) => {
  const { title, value, text, color, icon } = props;
  return (
    <div className="flex flex-col items-center rounded-xl border-[2px] border-[#ccc]">
      <div className="relative w-full flex justify-between">
        <div className="px-4 w-full text-center">{title}</div>
        {icon && <div className="absolute top-0 right-0">{icon}</div>}
      </div>
      <div className="w-full h-[75px]">
        <Gauge
          text={text}
          value={value}
          startAngle={-110}
          endAngle={110}
          innerRadius="80%"
          outerRadius="100%"
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 10,
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: color,
            },
          }}
        />
      </div>
    </div>
  );
};
