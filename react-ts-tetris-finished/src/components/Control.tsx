import React from "react";
import styled from "styled-components";
import DirTouch from "./DirTouch";
import Joystick from "./Joystick";

type Props = {
  touchMove: ({
    keyCode,
    repeat,
    dir,
  }: {
    keyCode?: number;
    repeat?: boolean;
    dir?: string;
  }) => void;
  //touchUp: ({ keyCode }: { keyCode: number }) => void;
  touchUp: () => void;
};

const Control: React.FC<Props> = ({ touchMove, touchUp }) => {
  return (
    <StyledControl>
      {/*}
      <DirTouch dir="up" touchMove={touchMove} touchUp={touchUp} />
      <RL_Wrapper>
        <DirTouch dir="left" touchMove={touchMove} touchUp={touchUp} />
        <DirTouch dir="right" touchMove={touchMove} touchUp={touchUp} />
      </RL_Wrapper>
      <DirTouch dir="down" touchMove={touchMove} touchUp={touchUp} />*/}
      <Joystick touchMove={touchMove} touchUp={touchUp} />
    </StyledControl>
  );
};

const StyledControl = styled.div`
  //position: absolute;
  width: 100%;
  //height: 90%;
  //opacity: 0.5;
`;

const RL_Wrapper = styled.div`
  left: 0;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
`;

export default Control;
