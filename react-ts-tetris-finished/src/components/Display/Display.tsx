import React from "react";
import styled from "styled-components";

type Props = {
  gameOver?: boolean;
  text: string;
};

const Display: React.FC<Props> = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

const StyledDisplay = styled.div<{ gameOver?: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: space-between;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 2px solid #777;
  min-height: 20px;
  width: 120px;
  border-radius: 10px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`;

export default Display;
