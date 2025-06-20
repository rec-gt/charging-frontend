import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Plate } from ".";
import dayjs from "dayjs";

type LineChartPlateProps = {
  title: string;
  icon?: any;
  data?: any;
} & any;

const options = {
  responsive: true,
  elements: {
    point: {
      radius: 1,
    },
    line: {
      tension: 0.2,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
    x: {
      ticks: {
        maxRotation: 0,
        minRotation: 0,
        maxTicksLimit: 5,
      },
    },
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export const LineChartPlate: React.FC<LineChartPlateProps> = (props) => {
  const { title, icon, data } = props;
  const [currentTimestamp, setCurrentTimestamp] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(dayjs().format("DD-MMM-YYYY HH:mm:ss"));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Plate title={title} icon={icon} timestamp={currentTimestamp}>
      <div className="w-full h-full">
        <Line options={options} data={data} />
      </div>
    </Plate>
  );
};
