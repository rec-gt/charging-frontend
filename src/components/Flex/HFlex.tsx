import { Stack, StackProps } from "@mui/material";
import React from "react";

type HFlexProps = {
  children: React.ReactNode;
} & StackProps;

export const HFlex: React.FC<HFlexProps> = (prop) => {
  const { children, ...rest } = prop;
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      {...rest}
    >
      {children}
    </Stack>
  );
};
