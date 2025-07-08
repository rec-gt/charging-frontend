import React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 flex justify-center items-center w-full h-12 bg-(--color-primary) text-[#eee]">
      RGT © 2025 ALL RIGHTS RESERVED
      <a
        className="text-(--color-primary)"
        target="_blank"
        href="/admin/setting"
      >
        {" "}
        S
      </a>
    </div>
  );
};
