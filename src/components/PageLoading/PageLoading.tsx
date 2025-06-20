import { Box, CircularProgress, Fade } from "@mui/material";
import React from "react";

export const PageLoading: React.FC<any> = (props) => {
  const { pageLoading } = props;

  return (
    <Fade in={pageLoading} timeout={150}>
      <Box
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "999",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000050",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </Box>
    </Fade>
  );
};
