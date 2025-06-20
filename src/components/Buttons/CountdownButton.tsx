import { Button, ButtonBaseProps } from "@mui/material";
import React, { useState } from "react";

const TIME_LEFT = 30;
type CountdownButtonProps = {
  fn: () => void;
} & ButtonBaseProps;

export const CountdownButton: React.FC<CountdownButtonProps> = (props) => {
  const { fn, children } = props;

  const [disabled, setDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LEFT);

  const handleCountDown = () => {
    fn();
    setDisabled(true);

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      setDisabled(false);
      window.clearInterval(interval);
      setTimeLeft(TIME_LEFT);
    }, TIME_LEFT * 1000);
  };

  return (
    <>
      <Button
        onClick={handleCountDown}
        variant={"outlined"}
        disabled={disabled}
        sx={{ minWidth: "100px", maxWidth: "100px" }}
      >
        {disabled ? `${timeLeft}s` : children}
      </Button>
    </>
  );
};
