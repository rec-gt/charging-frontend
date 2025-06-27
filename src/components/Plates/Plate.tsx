import React from "react";

type PlateProps = {
  title: string;
  topLeftElement?: any;
  topRightElement?: any;
  children: any;
};

export const Plate: React.FC<PlateProps> = (props) => {
  const { title, topLeftElement, topRightElement, children } = props;
  return (
    <div className="w-full h-full flex flex-col items-center rounded-xl border-[2px] border-[#ccc]">
      <div className="relative w-full flex justify-between">
        <div className="w-[32px] px-1 sm:w-full flex justify-start items-center text-nowrap">
          {topLeftElement}
        </div>
        <div className="px-1 w-full flex justify-center items-center text-center">{title}</div>
        <div className="w-[32px] px-1 sm:w-full flex justify-end items-center text-nowrap">
          {topRightElement}
        </div>
      </div>
      {children}
    </div>
  );
};
