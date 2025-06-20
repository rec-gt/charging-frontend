import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React from "react";

type InputFieldProps = {
  eyeToggle: boolean;
  eyeOnClick: () => void;
} & TextFieldProps;

export const InputFieldWithEye: React.FC<InputFieldProps> = (props) => {
  const { eyeToggle, eyeOnClick, ...rest } = props;
  return (
    <TextField
      {...rest}
      fullWidth={true}
      size="small"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="description for action"
                onClick={eyeOnClick}
              >
                {eyeToggle ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
