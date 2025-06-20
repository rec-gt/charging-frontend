import TextField, { TextFieldProps } from "@mui/material/TextField";
import React from "react";

type InputFieldProps = TextFieldProps;

export const InputField: React.FC<InputFieldProps> = (props) => {
  return <TextField {...props} fullWidth={true} size="small" />;
};
