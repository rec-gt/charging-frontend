import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SettingsIcon from "@mui/icons-material/Settings";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { backendServer } from "../../config";
import { setPageLoading } from "../../state/pageLoadingSlice";
import { LANG, LANG_OBJ } from "../../utils";
import { LineChartPlate, TextPlate } from "../Plates";
import { ChargePlate } from "../Plates/ChargePlate";

const defaultStats = {
  AT: 25,
  ST: 25,
  A: 0.1,
  SPST: 60,
  SPA: 5,
  C: 1,
  M: 0,
};

const defaultSeries = {
  time: Array.from({ length: 120 }, (_, i) => {
    return dayjs()
      .subtract(120 - i, "second")
      .format("HH:mm:ss");
  }),
  ambient: [],
  station: [],
  current: [],
};

export const Statistics: React.FC = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState(defaultStats);
  const [series, setSeries] = useState(defaultSeries);

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

  const handleGetSeries = async () => {
    await axios({
      method: "POST",
      url: `${backendServer}/system/get/series`,
    })
      .then((res) => {
        setSeries(res.data);
        dispatch(setPageLoading(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(setPageLoading(true));
    setStats(defaultStats);
    setSeries(defaultSeries);

    const interval = setInterval(() => {
      handleGetStats();
      handleGetSeries();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-9 h-[1000px] sm:grid-cols-3 sm:grid-rows-6 sm:h-[650px] gap-2 mb-4">
      <div className="row-start-1 col-start-1 sm:row-start-1 sm:col-start-1 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.CHARGING.MODE.TITLE)}
          text={
            [
              LANG(LANG_OBJ.CHARGING.MODE.RUNNING),
              LANG(LANG_OBJ.CHARGING.MODE.STOPPED),
              LANG(LANG_OBJ.CHARGING.MODE.BYPASS),
            ][stats.M]
          }
          icon={<SettingsIcon sx={{ color: "#555", fontSize: "16pt" }} />}
          isAlert={false}
        />
      </div>
      <div className="row-start-1 col-start-2 sm:row-start-2 sm:col-start-1 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.CHARGING.THRESHOLD)}
          text={`≥ ${stats.SPST.toFixed(0)} °C / ${stats.SPA.toFixed(0)} Amp`}
          icon={<ThermostatIcon sx={{ color: "#ff0000", fontSize: "16pt" }} />}
          isAlert={false}
        />
      </div>

      <div className="row-start-2 col-start-1 sm:row-start-3 sm:col-start-1 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
          text={`${stats.AT.toFixed(1)} °C`}
          icon={<ThermostatIcon sx={{ color: "#4c84ff", fontSize: "16pt" }} />}
          isAlert={stats.AT >= stats.SPST}
        />
      </div>
      <div className="row-start-2 col-start-2 sm:row-start-4 sm:col-start-1 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.GAUGE.STATION_TEMP)}
          text={`${stats.ST.toFixed(1)} °C`}
          icon={<ThermostatIcon sx={{ color: "#52b202", fontSize: "16pt" }} />}
          isAlert={stats.ST >= stats.SPST}
        />
      </div>
      <div className="row-start-3 col-start-1 sm:row-start-5 sm:col-start-1 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.GAUGE.CURRENT)}
          text={`${stats.A.toFixed(1)} Amp`}
          icon={
            <ElectricBoltIcon sx={{ color: "#ffa500", fontSize: "16pt" }} />
          }
          isAlert={false}
        />
      </div>
      <div className="row-start-3 col-start-2 sm:row-start-6 sm:col-start-1 col-span-1 row-span-1">
        <ChargePlate
          title={LANG(stats.C ? LANG_OBJ.CHARGING.ON : LANG_OBJ.CHARGING.OFF)}
          icon={
            <ElectricalServicesIcon sx={{ color: "#555", fontSize: "16pt" }} />
          }
          isCharging={Boolean(stats.C === 1)}
        />
      </div>
      <div className="col-span-2 row-span-3">
        <LineChartPlate
          title={LANG(LANG_OBJ.GAUGE.TEMP_MONITOR)}
          icon={<EqualizerIcon sx={{ color: "#555", fontSize: "16pt" }} />}
          data={{
            labels: series.time,
            datasets: [
              {
                label: LANG(LANG_OBJ.CHARGING.THRESHOLD.TEMP),
                backgroundColor: "#ff0000",
                hoverBackgroundColor: "#ff0000",
                borderWidth: 1.5,
                borderColor: "#ff0000",
                borderDash: [10, 10],
                pointRadius: 0,
                data: Array.from(
                  { length: series.time.length },
                  (_) => stats.SPST
                ),
              },
              {
                label: LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP),
                backgroundColor: "#4c84ff",
                hoverBackgroundColor: "#4c84ff80",
                borderWidth: 1.5,
                borderColor: "#4c84ff",
                data: series.ambient,
              },
              {
                label: LANG(LANG_OBJ.GAUGE.STATION_TEMP),
                backgroundColor: "#52b202",
                hoverBackgroundColor: "#52b20280",
                borderWidth: 1.5,
                borderColor: "#52b202",
                data: series.station,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: 80,
              },
              x: {
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  maxTicksLimit: 7,
                },
              },
            },
          }}
        />
      </div>
      <div className="col-span-2 row-span-3">
        <LineChartPlate
          title={LANG(LANG_OBJ.GAUGE.CURRENT_MONITOR)}
          icon={<EqualizerIcon sx={{ color: "#555", fontSize: "16pt" }} />}
          data={{
            labels: series.time,
            datasets: [
              {
                label: LANG(LANG_OBJ.CHARGING.THRESHOLD.CURRENT),
                backgroundColor: "#ff0000",
                hoverBackgroundColor: "#ff0000",
                borderWidth: 1.5,
                borderColor: "#ff0000",
                borderDash: [10, 10],
                pointRadius: 0,
                data: Array.from(
                  { length: series.time.length },
                  (_) => stats.SPA
                ),
              },
              {
                label: LANG(LANG_OBJ.GAUGE.CURRENT),
                backgroundColor: "#ffa500",
                borderWidth: 1.5,
                borderColor: "#ffa500",
                data: series.current,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: 10,
              },
              x: {
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  maxTicksLimit: 7,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
