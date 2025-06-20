import { Box } from "@mui/material";
import React from "react";

type FormTitleProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const FormTitle: React.FC<FormTitleProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <Box className="flex flex-row items-center w-full h-[36.5px]" {...rest}>
      {children}
    </Box>
  );
};
