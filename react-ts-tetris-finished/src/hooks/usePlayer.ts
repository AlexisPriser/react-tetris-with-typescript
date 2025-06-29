import React, { useState } from "react";
import { OneTetrominoType, STAGE_WIDTH, TetrominosType } from "../setup";
import { isColliding, randomTetromino } from "../gameHelpers";
import { STAGE } from "./useStage";
import { useDispatch, useSelector } from "react-redux";
import { setNextT } from "../NextTSlice";
import { RootState, store } from "../store";

export type PLAYER = {
  pos: {
    x: number;
    y: number;
  };
  tetromino: (string | number)[][];
  collided: boolean;
};

export const usePlayer = (nextT: OneTetrominoType) => {
  const [player, setPlayer] = React.useState({} as PLAYER);
  //const [nextT, setNextT] = useState<OneTetrominoType | undefined>(undefined);

  const dispatch = useDispatch();
  const rotate = (matrix: PLAYER["tetromino"]) => {
    // Make the rows to become cols (transpose)
    const mtrx = matrix.map((_, i) => matrix.map((column) => column[i]));
    // Reverse each row to get a rotated matrix
    return mtrx.map((row) => row.reverse());
  };

  const playerRotate = (stage: STAGE): void => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

    // This one is so the player can't rotate into the walls or other tetrominos that's merged
    const posX = clonedPlayer.pos.x;
    let offset = 1;
    while (isColliding(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > clonedPlayer.tetromino[0].length) {
        clonedPlayer.pos.x = posX;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({
    x,
    y,
    collided,
  }: {
    x: number;
    y: number;
    collided: boolean;
  }): void => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = React.useCallback((): void => {
    const _nxt = store.getState().nextT.value as OneTetrominoType;
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: _nxt.shape, //nextT.shape,
      collided: false,
    });
    dispatch(setNextT());
  }, []);

  return { player, updatePlayerPos, resetPlayer, playerRotate };
};
