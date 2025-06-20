import React from "react";
import styled from "styled-components";

type FormIconProps = {
  src: string;
};

export const FormIcon: React.FC<FormIconProps> = (props) => {
  const { src } = props;
  return <Container src={src} />;
};
const Container = styled.img`
  min-height: 100px;
  min-width: 100px;
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 100%;
  border: 2px solid #eee;
  overflow: hidden;
  cursor: pointer;
`;
