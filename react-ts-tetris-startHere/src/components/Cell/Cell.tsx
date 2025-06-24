import React from "react";
import { StyledCell } from "./Cell.styles";
import { TETROMINOS } from "../../setup";

type Props = {
  type: keyof typeof TETROMINOS;
};

const Cell: React.FC<Props> = ({ type }) => {
  return <StyledCell type={type} color={TETROMINOS[type].color}></StyledCell>;
};

export default React.memo(Cell);
