import { FormControlLabel, FormGroup, Slider, Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { backendServer } from "../../config";
import { setPageLoading } from "../../state/pageLoadingSlice";
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
    label: <div className="text-[#ff0000]">60°C⚠️</div>,
  },
  {
    value: 80,
    label: <div className="text-[#ff0000]">80°C⚠️</div>,
  },
];

export const SimulatePage: React.FC = () => {
  const dispatch = useDispatch();

  const [simulation, setSimulation] = useState(false);

  const handleGetStats = async () => {
    await axios({
      method: "POST",
      url: `${backendServer}/system/get/stats`,
    })
      .then((res) => {
        setSimulation(res.data.M == 3);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setPageLoading(false));
      });
  };

  const handleChangeMode = async (mode: 0 | 3) => {
    dispatch(setPageLoading(true));
    await axios({
      method: "POST",
      url: `${backendServer}/system/set/mode`,
      data: {
        mode,
      },
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    dispatch(setPageLoading(true));
    
    const interval = setInterval(() => {
      handleGetStats();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <PageLayout>
      <div className="w-full block sm:hidden">
        <SimulateTitle />
      </div>

      <div className="flex gap-2 items-center">
        SIMULATION
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                onChange={(e: any) => {
                  handleChangeMode(e.target.checked ? 3 : 0);
                }}
                checked={simulation}
              />
            }
            label={simulation ? "ON" : "OFF"}
          />
        </FormGroup>
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
          STATION TEMPERATURE
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
          CURRENT
        </div>
      </div>
    </PageLayout>
  );
};
