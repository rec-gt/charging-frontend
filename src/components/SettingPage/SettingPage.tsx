import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { backendServer } from "../../config";
import { PageLayout } from "../PageLayout";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../state/pageLoadingSlice";

const defaultStats = {
  SPT: null,
};

export const SettingPage: React.FC = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState(defaultStats);
  const [SPT, setSPT] = useState(80);

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

  const handleSetSPT = async () => {
    dispatch(setPageLoading(true));
    await axios({
      method: "POST",
      url: `${backendServer}/system/set/spt`,
      data: {
        SPT,
      },
    })
      .then((res) => {
        setSPT(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setPageLoading(false));
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetStats();
    }, 2000);

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
          <div>SET POINT TEMPERATURE</div>
          <input
            className="py-[0.1rem] px-1 rounded-sm border-[2px] border-[#ccc]"
            value={SPT}
            onChange={(e) => {
              setSPT(Number(e.target.value));
            }}
          />
          <Button onClick={handleSetSPT}>UPDATE</Button>
        </div>
      </div>
    </PageLayout>
  );
};
