import "chart.js/auto";
import dayjs from "dayjs";
import React from "react";
import { Line } from "react-chartjs-2";
import { Plate } from ".";

type LineChartPlateProps = {
  title: string;
  icon?: any;
  series?: any;
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

const timeSeries = Array.from({ length: 120 }, (_, i) => {
  return dayjs()
    .subtract(120 - i, "second")
    .format("HH:mm:ss");
});

const t1Series = Array.from({ length: 120 }, (_) => {
  return 8 + Math.random() * 5;
});

const t2Series = Array.from({ length: 120 }, (_) => {
  return 8 + Math.random() * 5;
});

export const LineChartPlate: React.FC<LineChartPlateProps> = (props) => {
  const { title, icon } = props;
  return (
    <Plate title={title} icon={icon}>
      <div className="w-full h-full">
        <Line
          options={options}
          data={{
            labels: timeSeries,
            datasets: [
              {
                label: "T1",
                borderColor: "#4c84ff",
                borderWidth: 1,
                backgroundColor: "#4c84ff",
                hoverBackgroundColor: "#4c84ff80",
                data: t1Series,
              },
              {
                label: "T2",
                borderColor: "#52b202",
                borderWidth: 1,
                backgroundColor: "#52b202",
                hoverBackgroundColor: "#52b20280",
                data: t2Series,
              },
            ],
          }}
        />
      </div>
    </Plate>
  );
};
