import PowerOffIcon from "@mui/icons-material/PowerOff";
import PowerIcon from "@mui/icons-material/Power";
import React from "react";
import { Plate } from "./Plate";

type ChargePlateProps = {
  title: string;
  isConnected: boolean;
  icon?: any;
};

export const ChargePlate: React.FC<ChargePlateProps> = (props) => {
  const { title, isConnected, icon } = props;
  return (
    <Plate title={title} icon={icon}>
      <div className="w-[40px] h-full flex justify-center items-center">
        {isConnected ? (
          <PowerIcon sx={{ fill: "#52b202", transform: "scale(2)" }} />
        ) : (
          <PowerOffIcon sx={{ fill: "#FF0000", transform: "scale(2)" }} />
        )}
      </div>
    </Plate>
  );
};
