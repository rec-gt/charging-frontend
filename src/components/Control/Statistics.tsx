import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LANG, LANG_OBJ, postReq2 } from "../../utils";
import { GaugePlate, LineChartPlate } from "../Plates";
import { ChargePlate } from "../Plates/ChargePlate";

const defaultStats = {
  ambientTemp: 21.25,
  stationTemp: 32.5,
  stationAmp: 8.53,
  isConnected: true,
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
  const dispatch = useDispatch();

  const [stats, setStats] = useState(defaultStats);
  const [series, setSeries] = useState(defaultSeries);

  const handleGetStats = async () => {
    await postReq2({ path: "/system/get/stats" }, dispatch);
  };

  const handleGetSeries = async () => {
    await postReq2({ path: "/system/get/series" }, dispatch);
  };

  useEffect(() => {
    setStats(defaultStats);
    setSeries(defaultSeries);
  }, []);

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-2 h-[500px]">
      <div className="row-start-1 col-span-1 row-span-1">
        <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
          text={`${stats.ambientTemp.toFixed(1)} °C`}
          value={stats.ambientTemp}
          color={"#4c84ff"}
          icon={<ThermostatIcon sx={{ color: "#4c84ff" }} />}
        />
      </div>
      <div className="row-start-2 col-span-1 row-span-1">
        <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.STATION_TEMP)}
          text={`${stats.stationTemp.toFixed(1)} °C`}
          value={stats.stationTemp}
          color={"#52b202"}
          icon={<ThermostatIcon sx={{ color: "#52b202" }} />}
        />
      </div>
      <div className="row-start-3 col-span-1 row-span-1">
        <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.CURRENT)}
          text={`${stats.stationAmp.toFixed(1)} Amp`}
          value={stats.stationAmp}
          valueMax={13}
          color={"#ffa500"}
          icon={<ElectricBoltIcon sx={{ color: "#ffa500" }} />}
        />
      </div>
      <div className="row-start-4 col-span-1 row-span-1">
        <ChargePlate
          title={LANG(
            stats.isConnected ? LANG_OBJ.CHARGING.ON : LANG_OBJ.CHARGING.OFF
          )}
          icon={<ElectricalServicesIcon />}
          isConnected={stats.isConnected}
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
        />
      </div>
    </div>
  );
};
