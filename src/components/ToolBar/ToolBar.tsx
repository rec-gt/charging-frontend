import { Box, Stack } from "@mui/material";
import React from "react";

type ToolBarProps = {
  text: React.ReactNode;
  children?: any;
} & React.HTMLAttributes<HTMLElement>;

export const ToolBar: React.FC<ToolBarProps> = (prop) => {
  const { text, children, ...rest } = prop;

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      {...rest}
    >
      <Box sx={{ lineHeight: "calc(2.1rem + 2px)" }}>{text}</Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        {children}
      </Stack>
    </Stack>
  );
};
