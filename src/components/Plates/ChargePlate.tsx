import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React from "react";
import { Plate } from "./Plate";

type ChargePlateProps = {
  title: string;
  value: number;
  text: string;
  color: string;
  icon?: any;
};

export const ChargePlate: React.FC<ChargePlateProps> = (props) => {
  const { title, value, text, color, icon } = props;
  return (
    <Plate title={title} icon={icon}>
      <div className="w-full h-full">
        Connected
      </div>
    </Plate>
  );
};
