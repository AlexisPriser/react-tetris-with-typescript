import React from "react";
import Cell from "../Cell/Cell";
//import { StyledNextT } from "./NextT.styles";
import { OneTetrominoType, TETROMINO_MAX_SIZE, TETROMINOS } from "../../setup";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export type STAGECELL = [keyof typeof TETROMINOS, string];
export type STAGE = STAGECELL[][];

type Props = {
  nextT: STAGE;
};

const NextT = () => {
  const nextT = useSelector((state: RootState) => {
    return state.nextT.value;
  });

  return (
    <StyledNextT
      $width={nextT.shape[0].length}
      $height={nextT.shape.length}
      $maxWidth={TETROMINO_MAX_SIZE}
    >
      {nextT.shape.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell} />)
      )}
    </StyledNextT>
  );
};

export const StyledNextT = styled.div<{
  $width: number;
  $height: number;
  $maxWidth?: number;
}>`
  display: grid;
  height: ${(props) =>
    props.$maxWidth ? `${props.$maxWidth * 31}px` : "auto"};
  grid-template-columns: repeat(${(props) => props.$width}, minmax(3vh, 20px));
  grid-template-rows: repeat(${(props) => props.$height}, minmax(3vh, 20px));
  grid-gap: 1px;
  border: 1px solid #777;
  background: #222;
`;

export default NextT;
