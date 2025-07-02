import { Button, Slider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { backendServer } from "../../config";
import { setPageLoading } from "../../state/pageLoadingSlice";
import { sleep } from "../../utils";
import { PageLayout } from "../PageLayout";

const marks = {
  SPT_MARKS: [20, 30, 40, 50, 60].map((e) => ({ value: e, label: `${e}°C` })),
  SPA_MARKS: [1, 2, 3, 4, 5, 6, 7].map((e) => ({ value: e, label: `${e}A` })),
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
      <div className="flex flex-col items-center mt-24 mb-48">
        <div className="grid grid-cols-2 grid-rows-1 min-h-[500px]">
          <div className="flex flex-col items-center p-4">
            <div className="h-full p-4">
              <Slider
                min={20}
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
                min={1}
                max={7}
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
        </div>

        <Button variant="contained" onClick={handleSetSP}>
          UPDATE
        </Button>
      </div>
    </PageLayout>
  );
};
