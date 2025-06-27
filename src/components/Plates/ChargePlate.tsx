import PowerOffIcon from "@mui/icons-material/PowerOff";
import PowerIcon from "@mui/icons-material/Power";
import React from "react";
import { Plate } from "./Plate";

type ChargePlateProps = {
  title: string;
  isCharging: boolean;
  icon?: any;
};

export const ChargePlate: React.FC<ChargePlateProps> = (props) => {
  const { title, isCharging, icon } = props;
  return (
    <Plate title={title} topRightElement={icon}>
      <div className="w-[40px] h-full flex justify-center items-center">
        {isCharging ? (
          <PowerIcon
            className="scale-[1.5] sm:scale-[2.5]"
            sx={{ fill: "#52b202" }}
          />
        ) : (
          <PowerOffIcon
            className="scale-[1.5] sm:scale-[2.5]"
            sx={{ fill: "#ff0000" }}
          />
        )}
      </div>
    </Plate>
  );
};
