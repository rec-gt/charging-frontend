import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { backendServer } from "../../config";
import { LANG, LANG_OBJ } from "../../utils";
import { GaugePlate, LineChartPlate, TextPlate } from "../Plates";
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
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-2 h-[600px]">
      <div className="row-start-1 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
          text={`${stats.AT.toFixed(1)} °C`}
          icon={<ThermostatIcon sx={{ color: "#4c84ff" }} />}
        />
        {/* <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
          text={`${stats.AT.toFixed(1)} °C`}
          value={stats.AT}
          color={"#4c84ff"}
          icon={<ThermostatIcon sx={{ color: "#4c84ff" }} />}
        /> */}
      </div>
      <div className="row-start-2 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.GAUGE.STATION_TEMP)}
          text={`${stats.ST.toFixed(1)} °C`}
          icon={<ThermostatIcon sx={{ color: "#52b202" }} />}
        />
        {/* <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.STATION_TEMP)}
          text={`${stats.ST.toFixed(1)} °C`}
          value={stats.ST}
          color={"#52b202"}
          icon={<ThermostatIcon sx={{ color: "#52b202" }} />}
        /> */}
      </div>
      <div className="row-start-3 col-span-1 row-span-1">
        <TextPlate
          title={LANG(LANG_OBJ.GAUGE.CURRENT)}
          text={`${stats.A.toFixed(1)} Amp`}
          icon={<ElectricBoltIcon sx={{ color: "#ffa500" }} />}
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
      <div className="row-start-4 col-span-1 row-span-1">
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
                borderWidth: 1,
                borderColor: "#4c84ff",
                data: series.ambient,
              },
              {
                label: LANG(LANG_OBJ.GAUGE.STATION_TEMP),
                backgroundColor: "#52b202",
                hoverBackgroundColor: "#52b20280",
                borderWidth: 1,
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
                borderWidth: 1,
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
                max: 16,
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
