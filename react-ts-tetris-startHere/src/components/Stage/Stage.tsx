import React from "react";
import Cell from "../Cell/Cell";
import { TETROMINOS } from "../../setup";
import { StyledStage } from "./Stage.styles";

export type STAGECELL = [keyof typeof TETROMINOS];
export type STAGE = STAGECELL[][];

type Props = {
  stage: STAGE;
};

const Stage: React.FC<Props> = ({ stage }) => {
  return (
    <StyledStage>
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

export default Stage;
