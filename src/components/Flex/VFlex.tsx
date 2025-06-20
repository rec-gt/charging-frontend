import { Divider, Stack, StackProps } from "@mui/material";
import React from "react";

type VFlexProps = {
  children: React.ReactNode;
  addDivider?: boolean;
} & StackProps;

export const VFlex: React.FC<VFlexProps> = (prop) => {
  const { children, addDivider, ...rest } = prop;

  return (
    <Stack
      margin={0}
      width={"100%"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      {...rest}
      divider={
        addDivider ? (
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ borderBottomColor: "#eee", borderBottomWidth: "2px" }}
          />
        ) : (
          <></>
        )
      }
    >
      {children}
    </Stack>
  );
};
