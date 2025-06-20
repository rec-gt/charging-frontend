import { Gauge } from "@mui/x-charts/Gauge";
import React from "react";

type GaugePlateProps = {
  title: string;
  value: number;
  content: string;
  color: string;
};

export const GaugePlate: React.FC<GaugePlateProps> = (props) => {
  const { title, value, content, color } = props;
  return (
    <div>
      <div className="w-[100px] h-[100px]">
        <Gauge
          value={value}
          startAngle={-110}
          endAngle={110}
          innerRadius="80%"
          outerRadius="100%"
        />
      </div>
    </div>
  );
};
