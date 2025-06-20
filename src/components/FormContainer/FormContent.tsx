import { Box } from "@mui/material";
import React from "react";

type FormContentProps = {
  children?: any;
};

export const FormContent: React.FC<FormContentProps> = (props) => {
  const { children } = props;
  return <Box width={"100%"}>{children}</Box>;
};
