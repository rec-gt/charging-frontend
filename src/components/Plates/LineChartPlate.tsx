import "chart.js/auto";
import React from "react";
import { Line } from "react-chartjs-2";
import { Plate } from ".";

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
  return (
    <Plate title={title} icon={icon}>
      <div className="w-full h-full">
        <Line options={options} data={data} />
      </div>
    </Plate>
  );
};
