import { Box } from "@mui/material";
import React from "react";

type FlexWrapProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const FlexWrap: React.FC<FlexWrapProps> = (prop) => {
  const { children, ...rest } = prop;
  return (
    <Box className="w-full flex flex-wrap gap-4" {...rest}>
      {children}
    </Box>
  );
};
