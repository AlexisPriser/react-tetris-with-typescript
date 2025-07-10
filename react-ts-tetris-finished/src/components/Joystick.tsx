import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

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
  touchUp: () => void;
};

type Input = {
  keyCode?: number;
  repeat?: boolean;
  dir?: string;
};

const Joystick: React.FC<Props> = ({ touchMove, touchUp }) => {
  const [hasMoved, setHasMoved] = useState(false);
  const [mousePos, setMousePos] = useState<{ x?: number; y?: number }>({});
  const [mousePosB, setMousePosB] = useState<{ x?: number; y?: number }>({});
  const [Count, setCount] = useState(0);
  const [baseInput, setBaseInput] = useState<Input>({
    keyCode: undefined,
    repeat: false,
    dir: "",
  });

  /*
  const changeTimer: React.MutableRefObject<any> = useRef(null);

  const timeoutClearUp = () => {
    setCount(0);
    clearInterval(changeTimer.current);
  };

  const increment = () => {
    changeTimer.current = setInterval(() => setCount((prev) => prev + 1), 1);
  };

  useEffect(() => {
    if (Count === 50) {
      console.log("touchup");
      touchUp();
    }
    if (Count > 50) {
      timeoutClearUp();
    }
  }, [Count]);*/

  const handleMouseMove = (event: React.TouchEvent<HTMLElement>) => {
    const xm = event.touches[0].clientX;
    const ym = event.touches[0].clientY;
    const xO = mousePos.x;
    const yO = mousePos.y;
    const cont = { x: xm, y: ym };
    const base = { ...baseInput };
    base.keyCode = 0;
    if (xO !== undefined && yO !== undefined) {
      const xx = xm - xO;
      const yy = yO - ym;
      const angle = (Math.atan2(yy, xx) * 180) / Math.PI;
      const distance = Math.hypot(xx, yy);
      let distdir = 30;
      if (distance > distdir) {
        if (angle > -45 && angle < 45) {
          base.dir = "right";
          //console.log("right");
        } else if (angle >= 45 && angle < 135) {
          base.dir = "up";
          //console.log("up");
          distdir = 50;
        } else if (angle >= 135 || angle < -135) {
          base.dir = "left";
          //console.log("left");
        } else if (angle >= -135 && angle < -45) {
          if (Count === 0) {
            //increment();
          }
          base.dir = "down";
          base.keyCode = 40; // Assuming 40 is the keyCode for the down arrow
          distdir = 50;
          //console.log("down");
        }

        if (base.dir !== "down") {
          //touchUp();
        }
        if (distance > distdir) {
          //console.log("angle", angle, "distance", distance, "distdir", distdir);
          setMousePos(cont);
          setBaseInput(base);
          touchMove(base);
          setHasMoved(true);
        }
      }
    } else {
      setMousePos(cont);
    }
  };

  const handleNoTouch: ReactEventHandler<HTMLElement> = () => {
    setMousePos({});
    setBaseInput({ keyCode: undefined, repeat: false, dir: "" });
    touchUp();
    if (!hasMoved) {
      const base = { ...baseInput };
      base.keyCode = 0;
      base.dir = "up";
      setBaseInput(base);
      touchMove(base);
    }
    setHasMoved(false);
  };

  /*
  useEffect(() => {
    if (
      (mousePosB.x === mousePos.x || mousePosB.y === mousePos.y) &&
      Count > 0
    ) {
      increment();
    } else {
      clearTimeout;
      setMousePosB(mousePos);
    }
    //console.log("Joystick mouse move", mousePos);
  });*/

  return (
    <StJoystick
      onTouchMove={handleMouseMove}
      onTouchCancel={handleNoTouch}
      onTouchEnd={handleNoTouch}
    />
  );
};

const StJoystick = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

export default Joystick;
