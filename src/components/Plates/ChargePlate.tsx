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
      {isConnected ? <PowerIcon /> : <PowerOffIcon />}
      <div className="w-full h-full">Connected</div>
    </Plate>
  );
};
