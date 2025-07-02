import { FormControlLabel, FormGroup, Slider, Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { backendServer } from "../../config";
import { setPageLoading } from "../../state/pageLoadingSlice";
import { LANG, LANG_OBJ } from "../../utils";
import { PageLayout } from "../PageLayout";

export const SimulatePage: React.FC = () => {
  const dispatch = useDispatch();

  const [simulation, setSimulation] = useState(false);

  const [marks, setMarks] = useState({
    AT_MARKS: [-100, 0, 20, 40, 60, 80].map((e) => ({
      value: e,
      label: <div className="text-[#444]">{e}°C</div>,
    })),

    ST_MARKS: [-100, 0, 20, 40, 60, 80].map((e) => ({
      value: e,
      label: <div className="text-[#444]">{e}°C</div>,
    })),

    A_MARKS: [-100, 0, 2, 4, 6, 8].map((e) => ({
      value: e,
      label: <div className="text-[#444]">{e}A</div>,
    })),
  });

  const [simValue, setSimValue] = useState({
    SIM_AT: 25,
    SIM_ST: 25,
    SIM_A: 1,
  });

  const handleGetStats = async () => {
    await axios({
      method: "POST",
      url: `${backendServer}/system/get/stats`,
    })
      .then((res) => {
        setSimulation(res.data.M == 3);
        setMarks((prev) => {
          prev.AT_MARKS[0] = {
            value: res.data.SPT,
            label: (
              <div className="text-[#ff0000]">{res.data.SPT}°C ⚠️</div>
            ) as any,
          };
          prev.ST_MARKS[0] = {
            value: res.data.SPT,
            label: (
              <div className="text-[#ff0000]">{res.data.SPT}°C ⚠️</div>
            ) as any,
          };
          prev.A_MARKS[0] = {
            value: res.data.SPA,
            label: (
              <div className="text-[#ff0000]">{res.data.SPA}A ⚠️</div>
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
      <div className="flex gap-4 justify-center items-center">
        <div>{LANG(LANG_OBJ.CHARGING.SIMUATION_MODE)}</div>
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
            label={LANG(
              simulation
                ? LANG_OBJ.CHARGING.SIMUATION_MODE.ON
                : LANG_OBJ.CHARGING.SIMUATION_MODE.OFF
            )}
          />
        </FormGroup>
      </div>

      <div className="grid grid-cols-3 grid-rows-1 h-[550px] mt-4 mb-48">
        <div className="flex flex-col items-center p-4">
          <div className="h-[500px] p-4">
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
          <div className="h-[25px] mt-[25px]">{LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}</div>
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="h-[500px] p-4">
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
          <div className="h-[25px] mt-[25px]">{LANG(LANG_OBJ.GAUGE.STATION_TEMP)}</div>
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="h-[500px] p-4">
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
          <div className="h-[25px] mt-[25px]">{LANG(LANG_OBJ.GAUGE.CURRENT)}</div>
        </div>
      </div>
    </PageLayout>
  );
};
