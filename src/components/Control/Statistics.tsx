import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { LANG, LANG_OBJ } from "../../utils";
import { GaugePlate, LineChartPlate } from "../Plates";
export const Statistics: React.FC = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-2">
      <div className="row-start-1 col-span-1 row-span-1">
        <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
          text={"21.25°C"}
          value={21.25}
          color={"#4c84ff"}
          icon={<ThermostatIcon fontSize="small" sx={{ color: "#4c84ff" }} />}
        />
      </div>
      <div className="row-start-2 col-span-1 row-span-1">
        <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.STATION_TEMP)}
          text={"23.5°C"}
          value={23.5}
          color={"#52b202"}
          icon={<ThermostatIcon fontSize="small" sx={{ color: "#52b202" }} />}
        />
      </div>
      <div className="row-start-3 col-span-1 row-span-1">
        <GaugePlate
          title={LANG(LANG_OBJ.GAUGE.CURRENT)}
          text={"8.5A"}
          value={8.5}
          color={"#ffa500"}
          icon={<ElectricBoltIcon fontSize="small" sx={{ color: "#ffa500" }} />}
        />
      </div>
      <div className="col-span-2 row-span-2">
        <LineChartPlate
          title={LANG(LANG_OBJ.GAUGE.TEMP_MONITOR)}
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
          series={[
            {
              curve: "linear",
              data: Array.from(
                { length: 120 },
                (_, i) => 8 + Math.random() * 5
              ),
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
              data: Array.from({ length: 13 }, (_, i) => i),
            },
          ]}
        />
      </div>
    </div>
  );
};
