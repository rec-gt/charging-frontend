import { Close } from "@mui/icons-material";
import { Box, Button, Fade, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

export type PageDialogDetailType = {
  title?: React.ReactNode;
  content?: React.ReactNode;
  confirmAction?: () => any;
  cancelAction?: () => any;
};

type PageDialogBoxProps = {
  dialogDetail?: PageDialogDetailType;
};
export const PageDialogBox: React.FC<PageDialogBoxProps> = (props) => {
  const { dialogDetail } = props;

  const title = dialogDetail?.title;
  const content = dialogDetail?.content;
  const confirmAction = dialogDetail?.confirmAction;
  const cancelAction = dialogDetail?.cancelAction;

  const [isOpenDialog, setOpenDialog] = useState(false);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = async () => {
    confirmAction && (await confirmAction());
    closeDialog();
  };

  const handleCancel = async () => {
    cancelAction && (await cancelAction());
    closeDialog();
  };

  useEffect(() => {
    if (dialogDetail) {
      setOpenDialog(true);
    }
  }, [dialogDetail]);

  useEffect(() => {
    document.body.style.overflow = isOpenDialog ? "hidden" : "scroll";
  }, [isOpenDialog]);

  return (
    <Fade in={isOpenDialog} timeout={150}>
      <Box className="fixed top-0 left-0 w-full h-full bg-[#00000050]  flex justify-center items-center">
        <Box className="w-full md:max-w-[600px] p-4 m-4 bg-[#fff] rounded-xl">
          <Stack
            className="pb-4 flex-row! justify-between items-center"
            spacing={2}
          >
            <Box>
              <b>{title}</b>
            </Box>
            <IconButton className="m-0!" onClick={closeDialog}>
              <Close />
            </IconButton>
          </Stack>

          <Box>{content}</Box>

          {Boolean(confirmAction || cancelAction) && (
            <Stack className="pt-4" direction={"row"} spacing={2}>
              <Button onClick={handleConfirm}>Confirm</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Stack>
          )}
        </Box>
      </Box>
    </Fade>
  );
};
