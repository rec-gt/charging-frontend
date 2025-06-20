import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { LANG, LANG_OBJ } from "../../utils";
import { GaugePlate } from "../Plates";
export const Statistics: React.FC = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2">
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
          title={LANG(LANG_OBJ.GAUGE.CHARGE_TEMP)}
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
          color={"#ffe438"}
          icon={<ElectricBoltIcon fontSize="small" sx={{ color: "#ffe438" }} />}
        />
      </div>
      <div className="col-span-2 row-span-2">4</div>
      <div className="col-span-2 row-span-1">5</div>
    </div>
  );
};
