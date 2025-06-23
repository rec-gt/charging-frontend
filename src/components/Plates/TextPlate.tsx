import React from "react";
import { Plate } from "./Plate";

type TextPlateProps = {
  title: string;
  text: string;
  icon?: any;
  isAlert: boolean;
} & any;

export const TextPlate: React.FC<TextPlateProps> = (props) => {
  const { title, text, icon, isAlert, ...rest } = props;
  return (
    <Plate title={title} icon={icon} {...rest}>
      <div
        className={`flex justify-center items-center h-full text-[30pt]! ${
          isAlert ? "text-[#ff0000]" : "text-[#000]"
        }`}
      >
        {text}
      </div>
    </Plate>
  );
};
