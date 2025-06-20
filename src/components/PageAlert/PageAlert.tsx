import { Alert, Box, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageAlert } from "../../state/pageAlertSlice";

const timeout = 150;

export const PageAlert: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const { alertDetail } = props;

  const [openAlert, setOpenAlert] = useState(!!alertDetail);
  const [animation, setAnimation] = useState(openAlert);

  useEffect(() => {
    if (alertDetail) {
      setOpenAlert(true);
      setAnimation(true);
    }
  }, [alertDetail]);

  return (
    alertDetail &&
    openAlert && (
      <Zoom in={animation} timeout={timeout}>
        <Box
          sx={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            zIndex: "9",
            padding: "2rem 1rem",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "500px",
              pointerEvents: "all",
            }}
          >
            <Alert
              sx={{
                boxShadow: 3,
              }}
              severity={alertDetail.severity}
              onClose={() => {
                setAnimation(false);
                setTimeout(() => {
                  dispatch(setPageAlert(null));
                }, timeout);
              }}
            >
              {alertDetail.text}
            </Alert>
          </Box>
        </Box>
      </Zoom>
    )
  );
};
