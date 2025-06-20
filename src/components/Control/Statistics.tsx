import { LANG, LANG_OBJ } from "../../utils";
import { GaugePlate } from "../Gauges";

export const Statistics: React.FC = () => {
  return (
    <div>
      <GaugePlate
        title={LANG(LANG_OBJ.GAUGE.AMBIENT_TEMP)}
        value={21.25}
        content={""}
        color={""}
      />
    </div>
  );
};
