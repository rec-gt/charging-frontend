import { LANG, LANG_OBJ } from "../../utils";
import { GaugePlate } from "../Gauges";

export const Statistics: React.FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <GaugePlate
        title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
        text={"21.25°C"}
        value={21.25}
        color={"#52b202"}
      />
      <GaugePlate
        title={LANG(LANG_OBJ.GAUGE.CHARGE_TEMP)}
        text={"23.5°C"}
        value={23.5}
        color={"#52b202"}
      />
    </div>
  );
};
