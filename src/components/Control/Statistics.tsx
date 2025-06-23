import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { backendServer } from "../../config";
import { LANG, LANG_OBJ } from "../../utils";
import { LineChartPlate, TextPlate } from "../Plates";
import { ChargePlate } from "../Plates/ChargePlate";

const defaultStats = {
  AT: 21.25,
  ST: 32.5,
  A: 8.53,
  C: 1,
};

const defaultSeries = {
  time: Array.from({ length: 120 }, (_, i) => {
    return dayjs()
      .subtract(120 - i, "second")
      .format("HH:mm:ss");
  }),
  ambient: Array.from({ length: 120 }, (_) => {
    return 22 + Math.random() * 5;
  }),
  station: Array.from({ length: 120 }, (_) => {
    return 22 + Math.random() * 5;
  }),
  current: Array.from({ length: 120 }, (_) => {
    return 8 + Math.random() * 5;
  }),
};

export const Statistics: React.FC = () => {
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
        // console.log(res.data[0])
        setSeries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setStats(defaultStats);
    setSeries(defaultSeries);

    const interval = setInterval(() => {
      handleGetStats();
      handleGetSeries();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const isAlert = stats.ST >= 80 || stats.AT >= 80;

  return (
    <div className="grid grid-cols-2 grid-rows-6 h-[800px] sm:grid-cols-3 sm:grid-rows-4 sm:h-[500px] gap-2 mb-4">
      <div className="row-start-1 col-start-1 sm:row-start-1 sm:col-start-1 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
          text={`${stats.AT.toFixed(1)} °C`}
          icon={<ThermostatIcon sx={{ color: "#4c84ff" }} />}
          isAlert={isAlert}
        />
        {/* <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
          text={`${stats.AT.toFixed(1)} °C`}
          value={stats.AT}
          color={"#4c84ff"}
          icon={<ThermostatIcon sx={{ color: "#4c84ff" }} />}
        /> */}
      </div>
      <div className="row-start-1 col-start-2 sm:row-start-2 sm:col-start-1 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.GAUGE.STATION_TEMP)}
          text={`${stats.ST.toFixed(1)} °C`}
          icon={<ThermostatIcon sx={{ color: "#52b202" }} />}
          isAlert={isAlert}
        />
        {/* <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.STATION_TEMP)}
          text={`${stats.ST.toFixed(1)} °C`}
          value={stats.ST}
          color={"#52b202"}
          icon={<ThermostatIcon sx={{ color: "#52b202" }} />}
        /> */}
      </div>
      <div className="row-start-2 col-start-1 sm:row-start-3 sm:col-start-1 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.GAUGE.CURRENT)}
          text={`${stats.A.toFixed(1)} Amp`}
          icon={<ElectricBoltIcon sx={{ color: "#ffa500" }} />}
          isAlert={isAlert}
        />
        {/* <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.CURRENT)}
          text={`${stats.A.toFixed(1)} Amp`}
          value={stats.A}
          valueMax={13}
          color={"#ffa500"}
          icon={<ElectricBoltIcon sx={{ color: "#ffa500" }} />}
        /> */}
      </div>
      <div className="row-start-2 col-start-2 sm:row-start-4 sm:col-start-1 col-span-1 row-span-1">
        <ChargePlate
          title={LANG(stats.C ? LANG_OBJ.CHARGING.ON : LANG_OBJ.CHARGING.OFF)}
          icon={<ElectricalServicesIcon />}
          isCharging={Boolean(stats.C === 1)}
        />
      </div>
      <div className="col-span-2 row-span-2">
        <LineChartPlate
          title={LANG(LANG_OBJ.GAUGE.TEMP_MONITOR)}
          icon={<EqualizerIcon />}
          data={{
            labels: series.time,
            datasets: [
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
                max: 100,
              },
              x: {
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  maxTicksLimit: 5,
                },
              },
            },
          }}
        />
      </div>
      <div className="col-span-2 row-span-2">
        <LineChartPlate
          title={LANG(LANG_OBJ.GAUGE.CURRENT_MONITOR)}
          icon={<EqualizerIcon />}
          data={{
            labels: series.time,
            datasets: [
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
                max: 20,
              },
              x: {
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  maxTicksLimit: 5,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
