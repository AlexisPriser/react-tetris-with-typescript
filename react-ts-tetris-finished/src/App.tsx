import React, { useEffect } from "react";
import { createStage, isColliding } from "./gameHelpers";

// Custom hooks
import { useInterval } from "./hooks/useInterval";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";
import { useGameStatus } from "./hooks/useGameStatus";

// Components
import Stage from "./components/Stage/Stage";
import Display from "./components/Display/Display";
import StartButton from "./components/StartButton/StartButton";

// Styles
import NextT from "./components/NextT/NextT";
import { useDispatch, useSelector } from "react-redux";
import { OneTetrominoType } from "./setup";
import { RootState } from "./store";
import Pause from "./components/Pause";
import { setReset } from "./PauseSlice";
import styled from "styled-components";
import DirTouch from "./components/DirTouch";

import ControllerSVG from "./img/controller.svg";
import Control from "./components/Control";
import { setShow } from "./ShowCtrlSlice";

const App: React.FC = () => {
  const [dropTime, setDroptime] = React.useState<null | number>(null);
  const [gameOver, setGameOver] = React.useState(true);

  const gameArea = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const nextT = useSelector((state: RootState) => {
    return state.nextT.value;
  }) as OneTetrominoType;

  const pause = useSelector((state: RootState) => state.pause);

  const { player, updatePlayerPos, resetPlayer, playerRotate } =
    usePlayer(nextT);
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } =
    useGameStatus(rowsCleared);

  const movePlayer = (dir: number) => {
    if (!isColliding(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const keyUp = ({ keyCode }: { keyCode: number }): void => {
    if (!gameOver) {
      // Change the droptime speed when user releases down arrow
      if (keyCode === 40) {
        setDroptime(1000 / level + 200);
      }
    }
  };

  const DownEnd = (): void => {
    if (!gameOver) {
      setDroptime(1000 / level + 200);
    }
  };

  const handleStartGame = (): void => {
    // Need to focus the window with the key events on start
    if (gameArea.current) gameArea.current.focus();
    // Reset everything
    setStage(createStage());
    setDroptime(1000);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
  };

  const move = ({
    keyCode,
    repeat,
    dir,
  }: {
    keyCode?: number;
    repeat?: boolean;
    dir?: string;
  }): void => {
    if (!gameOver && !pause.pause) {
      if (keyCode === 37 || dir === "left") {
        movePlayer(-1);
      } else if (keyCode === 39 || dir === "right") {
        movePlayer(1);
      } else if (keyCode === 40 || dir === "down") {
        // Just call once
        if (repeat) return;
        setDroptime(30);
      } else if (keyCode === 38 || dir === "up") {
        playerRotate(stage);
      }
    }
  };

  const touchMove = (direction: string): void => {
    if (!gameOver && !pause.pause) {
      if (direction === "left") {
        movePlayer(-1);
      } else if (direction === "right") {
        movePlayer(1);
      } else if (direction === "down") {
        setDroptime(30);
      } else if (direction === "up") {
        playerRotate(stage);
      }
    }
  };

  const drop = (): void => {
    // Increase level when player has cleared 10 rows
    if (rows > level * 10) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDroptime(1000 / level + 200);
    }

    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        //console.log("Game over!");
        setGameOver(true);
        setDroptime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  useInterval(() => {
    if (!pause.pause) {
      drop();
    }
  }, dropTime);

  useEffect(() => {
    if (pause.reset) {
      handleStartGame();
      dispatch(setReset());
    }
  }, [pause.reset]);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex={0}
      onKeyDown={move}
      onKeyUp={keyUp}
      ref={gameArea}
    >
      <StyledTetris>
        <StyledControlIcon
          src={ControllerSVG}
          alt="controller"
          width="60"
          height="60"
          onMouseDown={() => {
            dispatch(setShow(true));
          }}
          onMouseUp={() => {
            dispatch(setShow(false));
          }}
          onMouseLeave={() => {
            dispatch(setShow(false));
          }}
        />
        <div className="display">
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text="Game Over!" />
              <StartButton callback={handleStartGame} />
            </>
          ) : (
            <>
              <Display text={`Score: ${score}\nLevel: ${level}`} />
              <Pause />
              <NextT />
            </>
          )}
        </div>
        <StageControlWrapper>
          <Control touchMove={move} touchUp={keyUp} />

          <Stage stage={stage} />
        </StageControlWrapper>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

const StyledTetrisWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  outline: none;
`;

const StyledControlIcon = styled.img`
  align-self: end;
`;

const StyledTetris = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //padding: 60px 0;
  height: 100%;
  margin: 0 auto;

  .display {
    display: flex;
    justify-content: space-between;
    width: 380px;
  }
`;

const StageControlWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-items: center;
  padding: 40px 0px;
  margin: 0px auto;
`;

//                              CONTROLS//

export default App;
