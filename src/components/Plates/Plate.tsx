import React from "react";

type PlateProps = {
  title: string;
  icon: any;
  children: any;
};

export const Plate: React.FC<PlateProps> = (props) => {
  const { title, icon, children } = props;
  return (
    <div className="w-full h-full flex flex-col items-center rounded-xl border-[2px] border-[#ccc]">
      <div className="relative w-full flex justify-between">
        <div className="px-4 pt-1 w-full text-center">{title}</div>
        {icon && <div className="absolute top-0 right-0">{icon}</div>}
      </div>
      {children}
    </div>
  );
};
