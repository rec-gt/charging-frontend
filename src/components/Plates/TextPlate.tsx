import React from "react";
import { Plate } from "./Plate";

type TextPlateProps = {
  title: string;
  text: string;
  topLeftElement?: any;
  bottomMiddleElement?: any;
  icon?: any;
  isAlert: boolean;
} & any;

export const TextPlate: React.FC<TextPlateProps> = (props) => {
  const {
    title,
    text,
    topLeftElement,
    icon,
    bottomMiddleElement,
    isAlert,
    ...rest
  } = props;
  return (
    <Plate
      title={title}
      topLeftElement={topLeftElement}
      topRightElement={icon}
      bottomMiddleElement={bottomMiddleElement}
      {...rest}
    >
      <div
        className={`flex justify-center items-center h-full text-[clamp(15pt,3cqw,26pt)]! ${
          isAlert ? "text-[#ff0000]" : "text-[#000]"
        }`}
      >
        {text}
        {isAlert ? " ⚠️" : ""}
      </div>
    </Plate>
  );
};
