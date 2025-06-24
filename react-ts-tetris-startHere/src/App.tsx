import React from "react";
// Styles
import { StyledTetrisWrapper, StyledTetris } from "./App.styles";
import Stage from "./components/Stage/Stage";

const App: React.FC = () => {
  const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } =
    useGameStatus(rowsCleared);

  return (
    <StyledTetrisWrapper role="button" tabIndex={0}>
      <StyledTetris>
        <Stage />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default App;
