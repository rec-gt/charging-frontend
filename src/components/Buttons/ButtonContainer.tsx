import { Stack } from "@mui/material";
import React from "react";

type ButtonContainerProps = {
  children: any;
};

export const ButtonContainer: React.FC<ButtonContainerProps> = (props) => {
  const { children } = props;
  return (
    <Stack direction={"row"} justifyContent={"center"} spacing={2}>
      {children}
    </Stack>
  );
};
