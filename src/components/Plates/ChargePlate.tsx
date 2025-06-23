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
    <Plate title={title} icon={icon}>
      <div className="w-[40px] h-full flex justify-center items-center">
        {isCharging ? (
          <PowerIcon sx={{ fill: "#52b202", transform: "scale(2.5)" }} />
        ) : (
          <PowerOffIcon sx={{ fill: "#FF0000", transform: "scale(2.5)" }} />
        )}
      </div>
    </Plate>
  );
};
