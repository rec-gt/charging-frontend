import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

const genPageNumberArr = (totalPages: number, currentPage: number) => {
  const pageNumbers = [];
  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 2 || currentPage >= totalPages - 1) {
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage === 3) {
      pageNumbers.push(1, 2, 3, 4);
      pageNumbers.push("...");
      pageNumbers.push(totalPages - 1);
      pageNumbers.push(totalPages);
    } else if (currentPage === totalPages - 2) {
      pageNumbers.push(1, 2);
      pageNumbers.push("...");
      pageNumbers.push(totalPages - 3);
      pageNumbers.push(totalPages - 2);
      pageNumbers.push(totalPages - 1);
      pageNumbers.push(totalPages);
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      pageNumbers.push(currentPage + 1);
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
  }
  return pageNumbers;
};

export const Paginator: React.FC<PaginatorProps> = (props) => {
  const { currentPage, totalPages, handlePageChange } = props;

  const pageNumbers = genPageNumberArr(totalPages, currentPage);

  return (
    totalPages > 0 && (
      <>
        <PageButtonContainer>
          <PageButtonBar>
            <PageButton
              disabled={currentPage <= 1}
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
            >
              <KeyboardArrowLeft />
            </PageButton>
            {pageNumbers.map((page, index: number) => (
              <PageButton
                key={index}
                onClick={() => {
                  if (typeof page === "number") {
                    handlePageChange(page);
                  }
                }}
                variant={currentPage === page ? "contained" : "text"}
              >
                {page}
              </PageButton>
            ))}
            <PageButton
              disabled={currentPage >= totalPages}
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
            >
              <KeyboardArrowRight />
            </PageButton>
          </PageButtonBar>
        </PageButtonContainer>
      </>
    )
  );
};

const PageButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

const PageButtonBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const PageButton = styled(Button)`
  max-width: 2rem !important;
  max-height: 2rem !important;
  min-width: 2rem !important;
  min-height: 2rem !important;
`;
