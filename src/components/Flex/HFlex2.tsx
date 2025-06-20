import { Divider } from "@mui/material";
import React from "react";

type HFlex2Props = {
  children: React.ReactNode;
  spacing?: number;
  divider?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const HFlex2: React.FC<HFlex2Props> = (prop) => {
  const { children, spacing, divider, className } = prop;
  const extendedClassName = className ?? "";
  return (
    <div className={`flex flex-row gap-${spacing ?? 2} ${extendedClassName}`}>
      {React.Children.map(children, (child: any, i: number) => (
        <React.Fragment>
          {divider && (
            <>
              {i !== 0 && (
                <Divider
                  orientation={"horizontal"}
                  flexItem
                  sx={{ borderRightWidth: "1.5px", borderBottomWidth: "1.5px" }}
                />
              )}
            </>
          )}
          <React.Fragment>{child}</React.Fragment>
        </React.Fragment>
      ))}
    </div>
  );
};
