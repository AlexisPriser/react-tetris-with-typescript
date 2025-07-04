export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const TETROMINO_MAX_SIZE = 4;
export const ROWPOINTS = [40, 100, 300, 1200];

export type OneTetrominoType = {
  shape: (string | number)[][];
  color: string;
};
export type TetrominosType = Record<string | number, OneTetrominoType>;

export const TETROMINOS = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "80, 227, 230",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "36, 95, 223",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "223, 173, 36",
  },
  O: {
    shape: [
      ["O", 0],
      ["O", "O"],
    ],
    color: "223, 217, 36",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", 0, 0],
      ["S", 0, 0],
    ],
    color: "48, 211, 56",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "132, 61, 198",
  },
  Z: {
    shape: [
      [0, "Z", 0],
      ["Z", 0, 0],
      ["Z", "Z", 0],
    ],
    color: "227, 78, 78",
  },
} as TetrominosType;
