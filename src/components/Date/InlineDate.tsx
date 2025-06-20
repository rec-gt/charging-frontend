import { Box } from "@mui/material";
import React from "react";

type InlineDateProps = {
  date: string;
} & React.HTMLAttributes<HTMLElement>;

export const InlineDate: React.FC<InlineDateProps> = (prop) => {
  const { date } = prop;
  return (
    <Box
      className={`text-[10pt] text-[#ccc] min-w-max whitespace-nowrap overflow-hidden overflow-ellipsis`}
    >
      {date}
    </Box>
  );
};
