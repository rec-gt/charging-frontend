import "chart.js/auto";
import dayjs from "dayjs";
import React from "react";
import { Line } from "react-chartjs-2";

type LineChartPlateProps = {
  title: string;
  icon?: any;
  series?: any;
} & any;

const options = {
  responsive: true,
  elements: {
    point: {
      radius: 0.5,
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
      },
    },
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const timeSeries = Array.from({ length: 600 }, (_, i) => {
  return dayjs()
    .subtract(600 - i, "second")
    .format("HH:mm:ss");
});

const t1Series = Array.from({ length: 600 }, (_, i) => {
  return 8 + Math.random() * 5;
});

const t2Series = Array.from({ length: 600 }, (_, i) => {
  return 8 + Math.random() * 5;
});

export const LineChartPlate: React.FC<LineChartPlateProps> = (props) => {
  const { title, icon, series, ...rest } = props;
  return (
    <div className="w-full h-full flex flex-col items-center rounded-xl border-[2px] border-[#ccc]">
      <div className="px-4 w-full text-center">{title}</div>
      <div className="relative w-full flex justify-between">
        {icon && <div className="absolute top-0 right-0">{icon}</div>}
      </div>
      <div className="w-full h-full">
        <Line
          options={options}
          data={{
            labels: timeSeries,
            datasets: [
              {
                label: "T1",
                borderColor: "#4c84ff",
                backgroundColor: "#4c84ff",
                hoverBackgroundColor: "#4c84ff80",
                data: t1Series,
              },
              {
                label: "T2",
                borderColor: "#52b202",
                backgroundColor: "#52b202",
                hoverBackgroundColor: "#52b20280",
                data: t2Series,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
