import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React from "react";
import { Plate } from "./Plate";

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
    <Plate title={title} icon={icon}>
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
    </Plate>
  );
};
