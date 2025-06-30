import { Slider } from "@mui/material";
import { PageLayout } from "../PageLayout";
import { SimulateTitle } from "../Title";

const temperatureMarks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 40,
    label: "40°C",
  },
  {
    value: 60,
    label: "60°C",
  },
  {
    value: 80,
    label: "80°C",
  },
];

export const SimulatePage: React.FC = () => {
  return (
    <PageLayout>
      <div className="w-full block sm:hidden">
        <SimulateTitle />
      </div>
      <div className="grid grid-cols-3 grid-rows-1 min-h-[500px] mt-24 mb-48">
        <div className="flex flex-col items-center p-4">
          <div className="h-full p-4">
            <Slider
              min={0}
              max={80}
              defaultValue={20}
              valueLabelFormat={(v) => {
                return `${v}°C`;
              }}
              step={1}
              valueLabelDisplay="on"
              orientation="vertical"
              marks={temperatureMarks}
              onChange={(_, value) => {
                console.log(value);
              }}
            />
          </div>
          AMBIENT TEMPERATURE
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="h-full p-4">
            <Slider
              min={0}
              max={80}
              defaultValue={20}
              getAriaLabel={() => "Temperature"}
              getAriaValueText={(v) => `${v}°C`}
              step={1}
              valueLabelDisplay="on"
              orientation="vertical"
              marks={temperatureMarks}
              onChange={(_, value) => {
                console.log(value);
              }}
            />
          </div>
          AMBIENT TEMPERATURE
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="h-full p-4">
            <Slider
              min={0}
              max={80}
              defaultValue={20}
              getAriaLabel={() => "Temperature"}
              getAriaValueText={(v) => `${v}°C`}
              step={1}
              valueLabelDisplay="on"
              orientation="vertical"
              marks={temperatureMarks}
              onChange={(_, value) => {
                console.log(value);
              }}
            />
          </div>
          AMBIENT TEMPERATURE
        </div>
      </div>
    </PageLayout>
  );
};
