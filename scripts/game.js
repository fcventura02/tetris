const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const previewPiece = document.getElementById("nextPiece");
const previewPieceCtx = previewPiece.getContext("2d");

const scoreElement = document.getElementById("score");
const speedElement = document.getElementById("speed");

const modal = document.getElementById("modal");

let animation = null;
let isGameOver = false;

const previewRow = 4;
const previewCol = 4;
const previewSQ = 20;

const ROW = 20;
const COL = 10;
const SQ = 22;
const defaultColor = "#111";
const defaultBorder = "rgba(255,255,255,0.1)";

let canMove = true;
let speed = 500;
let dropStart = Date.now();
let score = 0;

let board = [];
for (let currentRow = 0; currentRow < ROW; currentRow++) {
  board[currentRow] = [];
  for (let currentCol = 0; currentCol < ROW; currentCol++) {
    board[currentRow][currentCol] = defaultColor;
  }
}

let previewBoard = [];
for (let currentRow = 0; currentRow < previewRow; currentRow++) {
  previewBoard[currentRow] = [];
  for (let currentCol = 0; currentCol < previewCol; currentCol++) {
    previewBoard[currentRow][currentCol] = "#333";
  }
}

drawBoard();

const PIECES = [
  [Z, "rgba(231, 76, 60,1.0)"],
  [S, "rgba(46, 204, 113,1.0)"],
  [T, "rgba(241, 196, 15,1.0)"],
  [O, "rgba(52, 152, 219,1.0)"],
  [L, "rgba(155, 89, 182,1.0)"],
  [I, "rgba(22, 160, 133,1.0)"],
  [J, "rgba(211, 84, 0,1.0)"],
];

let nextPiece = randomPiece();
let piece = randomPiece();

document.addEventListener("keydown", control);
document
  .getElementById("enter")
  .addEventListener("click", () => control({ code: "Enter" }));
document
  .getElementById("rotate")
  .addEventListener("click", () => control({ code: "ArrowUp" }));
document
  .getElementById("left")
  .addEventListener("click", () => control({ code: "ArrowLeft" }));
document
  .getElementById("down")
  .addEventListener("click", () => control({ code: "ArrowDown" }));
document
  .getElementById("right")
  .addEventListener("click", () => control({ code: "ArrowRight" }));
