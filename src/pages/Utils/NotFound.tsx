import { Box } from "@mui/material";
import React from "react";
import { VFlex } from "../../components";

export const NotFound: React.FC = () => {
  return (
    <VFlex>
      <Box>
        {`GO BACK TO `}
        <u>
          <a href="/demo">DEMO PAGE</a>
        </u>
      </Box>
    </VFlex>
  );
};
