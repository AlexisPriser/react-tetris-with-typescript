import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store";
import { setPause, setReset } from "../PauseSlice";

import pause_svg from "../img/pause.svg";
import play_svg from "../img/play.svg";
import refresh_svg from "../img/refresh.svg";

const Pause = () => {
  const pause = useSelector((state: RootState) => state.pause.pause);
  const dispatch = useDispatch();
  const [resetCount, setResetCount] = React.useState(0);
  const resetCountMax = 1000;

  const changeTimer: React.MutableRefObject<any> = useRef(null);

  const timeoutClearUp = () => {
    setResetCount(0);
    clearInterval(changeTimer.current);
  };

  const increment = () => {
    changeTimer.current = setInterval(
      () => setResetCount((prev) => prev + 1),
      1
    );
  };

  useEffect(() => {
    if (resetCount >= resetCountMax) {
      dispatch(setReset());
      setResetCount(0);
    }
  }, [resetCount]);

  return (
    <StyledPause
      onClick={() => dispatch(setPause())}
      onMouseUp={timeoutClearUp}
      onMouseLeave={timeoutClearUp}
      onMouseDown={increment}
    >
      <StyledLoad $coef={resetCount / resetCountMax} />
      <StyledContainer>
        <p>hold to reset</p>
        <img
          src={resetCount > 350 ? refresh_svg : pause ? play_svg : pause_svg}
          alt={pause ? "play" : "pause"}
          width="70"
          height="70"
        />
      </StyledContainer>
    </StyledPause>
  );
};

const StyledPause = styled.div<{ gameOver?: boolean }>`
  position: relative;
  box-sizing: border-box;

  margin: 0 0 20px 0;

  border: 2px solid #777;
  min-height: 20px;
  width: 120px;
  border-radius: 10px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  z-index: 0;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 0px 20px 20px;
  z-index: 3;
`;

const StyledLoad = styled.div<{ $coef: number }>`
  //position: relative;
  position: absolute;
  background: white;
  width: 100%;
  height: ${(props) => `${props.$coef * 100}%`};
  opacity: ${(props) => `${props.$coef}`};
  z-index: -1;
`;

export default Pause;
