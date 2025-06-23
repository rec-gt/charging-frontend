import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Plate } from ".";
import moment from "moment";
import "moment-timezone";

type LineChartPlateProps = {
  title: string;
  icon?: any;
  data?: any;
  options?: any;
} & any;

const globalOptions = {
  responsive: true,
  elements: {
    point: {
      radius: 1,
    },
    line: {
      tension: 0.2,
    },
  },
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export const LineChartPlate: React.FC<LineChartPlateProps> = (props) => {
  const { title, icon, data, options } = props;
  const [currentTimestamp, setCurrentTimestamp] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = moment().tz("Asia/Tokyo").format("MMM-DD HH:mm:ss");
      setCurrentTimestamp(currentTime);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Plate title={title} icon={icon} timestamp={currentTimestamp}>
      <div className="w-full h-full px-2">
        <Line options={{ ...globalOptions, ...options }} data={data} />
      </div>
    </Plate>
  );
};
