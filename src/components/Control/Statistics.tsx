import { LANG, LANG_OBJ } from "../../utils";
import { GaugePlate } from "../Gauges";

export const Statistics: React.FC = () => {
  return (
    <div>
      <GaugePlate
        title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
        text={"21.25°C"}
        value={21.25}
        color={"#52b202"}
      />
    </div>
  );
};
