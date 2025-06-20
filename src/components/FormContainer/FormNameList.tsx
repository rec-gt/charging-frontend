import { Box } from "@mui/material";
import React from "react";

type FormNameListProps = {
  children: React.ReactNode;
};

export const FormNameList: React.FC<FormNameListProps> = (prop) => {
  const { children } = prop;
  return <Box className="flex flex-wrap gap-4">{children}</Box>;
};
