import { MenuItem, Select } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import React from "react";

type SelectFieldProps = { options: any } & SelectInputProps;

export const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { options } = props;
  return (
    <Select {...props} fullWidth={true} size="small">
      {options.map((item: any, index: number) => (
        <MenuItem key={index} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};
