import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { LANG, LANG_OBJ } from "../../utils";
import { GaugePlate, LineChartPlate } from "../Plates";
import { ChargePlate } from "../Plates/ChargePlate";

const defaultStats = {
  ambientTemp: 21.25,
  stationTemp: 32.5,
  stationAmp: 8.53,
  isConencted: true,
};

export const Statistics: React.FC = () => {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    setStats(defaultStats);
  }, []);

  const [ambientTemps, setAmbientTemps] = useState([]);
  const [stationTemps, setStationTemps] = useState([]);

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-2 h-[500px]">
      <div className="row-start-1 col-span-1 row-span-1">
        <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
          text={`${stats.ambientTemp} °C`}
          value={stats.ambientTemp}
          color={"#4c84ff"}
          icon={<ThermostatIcon sx={{ color: "#4c84ff" }} />}
        />
      </div>
      <div className="row-start-2 col-span-1 row-span-1">
        <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.STATION_TEMP)}
          text={`${stats.stationTemp} °C`}
          value={stats.stationTemp}
          color={"#52b202"}
          icon={<ThermostatIcon sx={{ color: "#52b202" }} />}
        />
      </div>
      <div className="row-start-3 col-span-1 row-span-1">
        <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.CURRENT)}
          text={`${stats.stationAmp} Amp`}
          value={stats.stationAmp}
          valueMax={13}
          color={"#ffa500"}
          icon={<ElectricBoltIcon sx={{ color: "#ffa500" }} />}
        />
      </div>
      <div className="row-start-4 col-span-1 row-span-1">
        <ChargePlate
          title={LANG(
            stats.isConencted ? LANG_OBJ.CHARGING.ON : LANG_OBJ.CHARGING.OFF
          )}
          icon={<ElectricalServicesIcon />}
          isConnected={stats.isConencted}
        />
      </div>
      <div className="col-span-2 row-span-2">
        <LineChartPlate
          title={LANG(LANG_OBJ.GAUGE.TEMP_MONITOR)}
          icon={<EqualizerIcon />}
          series={[
            {
              curve: "linear",
              data: [1, 5, 2, 6, 3, 9.3],
              label: LANG(LANG_OBJ.GAUGE.CHART_LABEL.AMBIENT),
              color: "#4c84ff",
            },
            {
              curve: "linear",
              data: [6, 3, 7, 9.5, 4, 2],
              label: LANG(LANG_OBJ.GAUGE.CHART_LABEL.STATION),
              color: "#52b202",
            },
          ]}
        />
      </div>
      <div className="col-span-2 row-span-2">
        <LineChartPlate
          title={LANG(LANG_OBJ.GAUGE.CURRENT_MONITOR)}
          icon={<EqualizerIcon />}
          series={[
            {
              curve: "linear",
              data: Array.from({ length: 120 }, (_, i) => {
                return dayjs()
                  .subtract(120 - i, "second")
                  .format("YYYY-MM-DD HH:mm:ss");
              }),
              color: "#4c84ff",
            },
          ]}
          xAxis={[
            {
              data: Array.from({ length: 120 }, (_, i) => i),
            },
          ]}
          yAxis={[
            {
              data: [0, 1, 2],
            },
          ]}
        />
      </div>
    </div>
  );
};
