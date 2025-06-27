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
    <Plate title={title} topRightElement={icon} {...rest}>
      <div
        className={`flex justify-center items-center h-full text-[clamp(15pt,3cqw,26pt)]! pb-2 ${
          isAlert ? "text-[#ff0000]" : "text-[#000]"
        }`}
      >
        {text}
        {isAlert ? " ⚠️" : ""}
      </div>
    </Plate>
  );
};
