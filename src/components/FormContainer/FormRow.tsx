import { Box } from "@mui/material";
import React from "react";

type FormRowProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const FormRow: React.FC<FormRowProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <Box
      className="flex flex-col md:flex-row items-start md:items-center py-4 w-full"
      {...rest}
    >
      {children}
    </Box>
  );
};
