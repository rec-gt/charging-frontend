import { Button, ButtonBaseProps, IconButton } from "@mui/material";
import React from "react";

type ResponsiveButtonProps = {
  onClick?: any;
  icon?: any;
  text: string;
  variant?: any;
  color?: any;
} & ButtonBaseProps;

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = (props) => {
  const { onClick, icon, text, variant, color, children, ...rest } = props;
  return (
    <>
      <IconButton
        className="flex! md:hidden!"
        onClick={onClick}
        color={color ?? "primary"}
      >
        {icon}
      </IconButton>
      <Button
        className="hidden! md:flex!"
        variant={variant ?? "outlined"}
        onClick={onClick}
        color={color ?? "primary"}
        endIcon={icon}
        {...rest}
      >
        {text}
        {children}
      </Button>
    </>
  );
};
