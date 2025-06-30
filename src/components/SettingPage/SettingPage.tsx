import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { backendServer } from "../../config";
import { PageLayout } from "../PageLayout";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../state/pageLoadingSlice";
import { sleep } from "../../utils";

const defaultStats = {
  SPT: null,
  SPA: null,
};

export const SettingPage: React.FC = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState(defaultStats);
  const [SPT, setSPT] = useState(80);
  const [SPA, setSPA] = useState(1);

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
    </PageLayout>
  );
};
