import { Box } from "@mui/material";
import React from "react";

type FormNameProps = {
  children?: any;
  className?: any;
};

export const FormName: React.FC<FormNameProps> = (props) => {
  const { className, children } = props;
  return (
    <Box
      className={`${
        className ?? ""
      } mr-0 md:mr-4 mb-2 md:mb-0 min-w-[100%] md:min-w-[230px]`}
    >
      {children}
    </Box>
  );
};
