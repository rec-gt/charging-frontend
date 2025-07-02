import { Button, Slider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { backendServer } from "../../config";
import { setPageLoading } from "../../state/pageLoadingSlice";
import { sleep } from "../../utils";
import { PageLayout } from "../PageLayout";

const defaultStats = {
  SPT: null,
  SPA: null,
};

export const SettingPage: React.FC = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState(defaultStats);
  const [SPT, setSPT] = useState(80);
  const [SPA, setSPA] = useState(1);

  const [marks, setMarks] = useState({
    SPT_MARKS: [
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
    SPA_MARKS: [
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
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSetSP = async () => {
    dispatch(setPageLoading(true));
    await axios({
      method: "POST",
      url: `${backendServer}/system/set/sp`,
      data: {
        SPT,
        SPA,
      },
    })
      .then((res) => {
        setStats(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(async () => {
        await sleep(300);
        dispatch(setPageLoading(false));
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetStats();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <PageLayout>
      <div className="flex flex-col gap-2 justify-center items-center h-[600px]">
        <div className="flex gap-2 justify-center items-center">
          <div>CURRENT SET POINT TEMPERATURE</div>
          <div>{stats.SPT ?? "-"}</div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div>CURRENT SET POINT CURRENT</div>
          <div>{stats.SPA ?? "-"}</div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div>SET POINT TEMPERATURE</div>
          <input
            className="py-[0.1rem] px-1 rounded-sm border-[2px] border-[#ccc]"
            value={SPT}
            onChange={(e) => {
              setSPT(Number(e.target.value));
            }}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div>SET POINT CURRENT</div>
          <input
            className="py-[0.1rem] px-1 rounded-sm border-[2px] border-[#ccc]"
            value={SPA}
            onChange={(e) => {
              setSPA(Number(e.target.value));
            }}
          />
        </div>
        <Button onClick={handleSetSP}>UPDATE</Button>
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
              marks={marks.SPT_MARKS}
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
              defaultValue={0.5}
              valueLabelFormat={(v) => {
                return `${v}A`;
              }}
              step={0.1}
              valueLabelDisplay="on"
              orientation="vertical"
              marks={marks.SPA_MARKS}
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
