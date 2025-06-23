import React from "react";
import { Plate } from "./Plate";

type TextPlateProps = {
  title: string;
  value: number;
  text: string;
  color: string;
  icon?: any;
} & any;

export const TextPlate: React.FC<TextPlateProps> = (props) => {
  const { title, value, text, color, icon, ...rest } = props;
  return (
    <Plate title={title} icon={icon}>
      {text}
    </Plate>
  );
};
