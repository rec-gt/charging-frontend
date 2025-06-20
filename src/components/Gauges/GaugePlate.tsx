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
    <div
      className={`relative flex flex-col items-center rounded-xl border-[2px] border-[#ccc]`}
    >
      <span>{title}</span>
      {icon && <div className="absolute top-0 right-0">{icon}</div>}
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
              fontSize: 12,
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
