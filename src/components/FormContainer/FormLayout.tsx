import { Stack } from "@mui/material";
import React from "react";

type FormLayoutProps = {
  children: React.ReactNode;
};

export const FormLayout: React.FC<FormLayoutProps> = (prop) => {
  const { children } = prop;
  return (
    <Stack spacing={2} className="w-full md:w-[800px]">
      {children}
    </Stack>
  );
};
