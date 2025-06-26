import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ShowCtrlSlice from "../ShowCtrlSlice";
import { RootState } from "../store";
import { useSelector } from "react-redux";

type Props = {
  dir: string;
  touchMove: ({
    keyCode,
    repeat,
    dir,
  }: {
    keyCode?: number;
    repeat?: boolean;
    dir?: string;
  }) => void;
  touchUp: ({ keyCode }: { keyCode: number }) => void;
};

const DirTouch: React.FC<Props> = ({ dir, touchMove, touchUp }) => {
  const [Count, setCount] = React.useState(0);
  const CountMax = 10;
  const CountRepeat = 2;

  const show = useSelector((state: RootState) => state.showCtrl.show);

  const changeTimer: React.MutableRefObject<any> = useRef(null);

  const timeoutClearUp = () => {
    setCount(0);
    clearInterval(changeTimer.current);
    touchUp({ keyCode: 40 }); // Assuming 40 is the keyCode for the up arrow
  };

  const increment = () => {
    changeTimer.current = setInterval(() => setCount((prev) => prev + 1), 1);
  };

  useEffect(() => {
    if (Count >= CountMax && Count % CountRepeat === 0) {
      const repeat = Count > 0;
      touchMove({ keyCode: undefined, repeat, dir });
      //setCount(0);
    }
  }, [Count]);

  return (
    <ST_DirTouch
      dir={dir}
      show={show}
      onMouseUp={timeoutClearUp}
      onMouseLeave={timeoutClearUp}
      onMouseDown={() => {
        touchMove({ keyCode: undefined, repeat: false, dir });
        increment();
      }}
    >
      {dir}
    </ST_DirTouch>
  );
};

const handleDirHeight = (dir: string) => {
  switch (dir) {
    case "up":
      return "45%";
    case "left":
      return "auto";
    case "right":
      return "auto";
    case "down":
      return "25%";
    default:
      return null;
  }
};

const handleDirColor = (dir: string) => {
  switch (dir) {
    case "up":
      return "green";
    case "left":
      return "red";
    case "right":
      return "blue";
    case "down":
      return "yellow";
    default:
      return null;
  }
};

const ST_DirTouch = styled.div<{ dir: string; show: boolean }>`
  width: 100%;
  height: ${(props) => handleDirHeight(props.dir)};
  background: ${(props) => handleDirColor(props.dir)};
  text-align: center;
  align-content: center;
  font-size: xxx-large;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

export default DirTouch;
