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
        <div className="w-[25px] h-[25px] sm:w-full flex justify-start">
          {topLeftElement}
        </div>
        <div className="w-full text-center">{title}</div>
        <div className="w-[25px] h-[25px] sm:w-full flex justify-end">
          {topRightElement}
        </div>
        {/* <div className="px-7 pt-1 w-full text-center">{title}</div> */}
        {/* {topLeftElement && (
          <div className="absolute top-0 left-0 py-1 px-2">
            {topLeftElement}
          </div>
        )}
        {icon && <div className="absolute top-0 right-0 p-1">{icon}</div>} */}
      </div>
      {children}
    </div>
  );
};
