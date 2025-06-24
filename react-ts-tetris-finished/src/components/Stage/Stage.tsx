import React from "react";
import Cell from "../Cell/Cell";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../setup";
import { TETROMINOS } from "../../setup";
import styled from "styled-components";

export type STAGECELL = [keyof typeof TETROMINOS, string];
export type STAGE = STAGECELL[][];

type Props = {
  stage: STAGE;
};

const Stage: React.FC<Props> = ({ stage }) => (
  <StyledStage>
    {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
);

const StyledStage = styled.div`
  display: grid;
  grid-template-columns: repeat(${STAGE_WIDTH}, 30px);
  grid-template-rows: repeat(${STAGE_HEIGHT}, 30px);
  grid-gap: 1px;
  border: 1px solid #777;
  background: #222;
`;

export default Stage;
