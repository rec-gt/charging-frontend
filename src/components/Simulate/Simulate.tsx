import { FormControlLabel, FormGroup, Slider, Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { backendServer } from "../../config";
import { setPageLoading } from "../../state/pageLoadingSlice";
import { PageLayout } from "../PageLayout";
import { SimulateTitle } from "../Title/SimulateTitle";

export const SimulatePage: React.FC = () => {
  const dispatch = useDispatch();

  const [simulation, setSimulation] = useState(false);

  const [marks, setMarks] = useState({
    AT_MARKS: [
      { key: 0, value: 0, label: "FOR_SET_POINT" },
      {
        key: 1,
        value: 0,
        label: "0°C",
      },
      {
        key: 2,
        value: 20,
        label: "20°C",
      },
      {
        key: 3,
        value: 40,
        label: "40°C",
      },
      {
        key: 4,
        value: 60,
        label: "60°C",
      },
      {
        key: 5,
        value: 80,
        label: "80°C",
      },
    ],
    ST_MARKS: [
      { value: 0, label: "FOR_SET_POINT" },
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
    ],
    A_MARKS: [
      { value: 0, label: "FOR_SET_POINT" },
      {
        value: 0,
        label: "0A",
      },
      {
        value: 2,
        label: "2A",
      },
      {
        value: 4,
        label: "4A",
      },
      {
        value: 6,
        label: "6A",
      },
      {
        value: 8,
        label: "8A",
      },
    ],
  });

  const [simValue, setSimValue] = useState({
    SIM_AT: 20,
    SIM_ST: 20,
    SIM_A: 0.5,
  });

  const handleGetStats = async () => {
    await axios({
      method: "POST",
      url: `${backendServer}/system/get/stats`,
    })
      .then((res) => {
        console.log(res.data);

        setSimulation(res.data.M == 3);
        setMarks((prev) => {
          prev.AT_MARKS[0] = {
            key: 1,
            value: res.data.SPT,
            label: (
              <div className="text-[#ff0000]">
                {res.data.SPT}°C (THRESHOLD) ⚠️
              </div>
            ) as any,
          };
          prev.ST_MARKS[0] = {
            value: res.data.SPT,
            label: (
              <div className="text-[#ff0000]">
                {res.data.SPT}°C (THRESHOLD) ⚠️
              </div>
            ) as any,
          };
          prev.A_MARKS[0] = {
            value: res.data.SPA,
            label: (
              <div className="text-[#ff0000]">
                {res.data.SPA}A (THRESHOLD)⚠️
              </div>
            ) as any,
          };
          return prev;
        });
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

  const handleChangeSIM = async () => {
    await axios({
      method: "POST",
      url: `${backendServer}/system/set/sim`,
      data: {
        SIM_AT: simValue.SIM_AT,
        SIM_ST: simValue.SIM_ST,
        SIM_A: simValue.SIM_A,
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

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleChangeSIM();
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [simValue]);

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
              value={simValue.SIM_AT}
              valueLabelFormat={(v) => {
                return `${v}°C`;
              }}
              step={1}
              valueLabelDisplay="on"
              orientation="vertical"
              marks={marks.AT_MARKS}
              onChange={(_, value) => {
                setSimValue((prev) => {
                  return { ...prev, SIM_AT: value as number };
                });
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
              value={simValue.SIM_ST}
              valueLabelFormat={(v) => {
                return `${v}°C`;
              }}
              step={1}
              valueLabelDisplay="on"
              orientation="vertical"
              marks={marks.ST_MARKS}
              onChange={(_, value) => {
                setSimValue((prev) => {
                  return { ...prev, SIM_ST: value as number };
                });
              }}
            />
          </div>
          STATION TEMPERATURE
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="h-full p-4">
            <Slider
              min={0}
              max={8}
              value={simValue.SIM_A}
              valueLabelFormat={(v) => {
                return `${v}A`;
              }}
              step={0.1}
              valueLabelDisplay="on"
              orientation="vertical"
              marks={marks.A_MARKS}
              onChange={(_, value) => {
                setSimValue((prev) => {
                  return { ...prev, SIM_A: value as number };
                });
              }}
            />
          </div>
          CURRENT
        </div>
      </div>
    </PageLayout>
  );
};
