import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import styled from "styled-components";

type AccordionContainerProps = {
  expanded?: boolean;
  summary: any;
  children: any;
};

export const AccordionContainer: React.FC<AccordionContainerProps> = (prop) => {
  const { expanded, summary, children } = prop;

  return (
    <CustomAccordion defaultExpanded={expanded} disableGutters elevation={0}>
      <AccordionSummary
        sx={{ minHeight: "35.6px" }}
        expandIcon={<KeyboardArrowDownIcon />}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </CustomAccordion>
  );
};

const CustomAccordion = styled(Accordion)(() => {
  return {
    width: "100%",
    background: "#fff",
    boxShadow: "none", // this styles directly apply to accordion
    ".MuiAccordionDetails-root": {
      padding: "0 !important",
    },
    ".MuiAccordionSummary-root": {
      padding: "0 !important",
    },
    ".MuiAccordionSummary-content": {
      margin: "0 !important",
    },
  };
});
