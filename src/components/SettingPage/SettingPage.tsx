import { Button, Slider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { backendServer } from "../../config";
import { setPageLoading } from "../../state/pageLoadingSlice";
import { sleep } from "../../utils";
import { PageLayout } from "../PageLayout";

const marks = {
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
};

export const SettingPage: React.FC = () => {
  const dispatch = useDispatch();

  const [spValue, setSpValue] = useState({
    SPT: 0,
    SPA: 0,
  });

  const handleGetStats = async () => {
    await axios({
      method: "POST",
      url: `${backendServer}/system/get/stats`,
    })
      .then((res) => {
        setSpValue({ SPT: res.data.SPT, SPA: res.data.SPA });
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
        SPT: spValue.SPT,
        SPA: spValue.SPA,
      },
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
    handleGetStats();
  }, []);

  return (
    <PageLayout>
      <div className="grid grid-cols-2 grid-rows-1 min-h-[500px] mt-24 mb-48">
        <div className="flex flex-col items-center p-4">
          <div className="h-full p-4">
            <Slider
              min={0}
              max={60}
              value={spValue.SPT}
              valueLabelFormat={(v) => {
                return `${v}°C`;
              }}
              step={1}
              valueLabelDisplay="on"
              orientation="vertical"
              marks={marks.SPT_MARKS}
              onChange={(_, value) => {
                setSpValue((prev) => {
                  return { ...prev, SPT: value as number };
                });
              }}
            />
          </div>
          SET POINT TEMPERATURE
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="h-full p-4">
            <Slider
              min={0}
              max={8}
              value={spValue.SPA}
              valueLabelFormat={(v) => {
                return `${v}A`;
              }}
              step={0.1}
              valueLabelDisplay="on"
              orientation="vertical"
              marks={marks.SPA_MARKS}
              onChange={(_, value) => {
                setSpValue((prev) => {
                  return { ...prev, SPA: value as number };
                });
              }}
            />
          </div>
          SET POINT CURRENT
        </div>
        <Button onClick={handleSetSP}>UPDATE</Button>
      </div>
    </PageLayout>
  );
};
