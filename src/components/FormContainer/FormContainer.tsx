import { Box, Divider, Stack } from "@mui/material";
import React from "react";

type FormContainerProps = {
  disableDivider?: boolean;
  children: React.ReactNode;
};

export const FormContainer: React.FC<FormContainerProps> = (prop) => {
  const { children, disableDivider } = prop;
  return (
    <Box className="flex bg-white p-4 rounded-xl w-full h-min-content">
      <Stack
        width={"100%"}
        justifyContent={"center"}
        divider={
          !disableDivider ? (
            <Divider
              orientation="horizontal"
              flexItem
              sx={{ borderBottomColor: "#eee", borderBottomWidth: "2px" }}
            />
          ) : undefined
        }
      >
        {children}
      </Stack>
    </Box>
  );
};
