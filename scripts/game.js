const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");
const speedElement = document.getElementById("speed");

const ROW = 20;
const COL = 10;
const SQ = 30;
const defaultColor = "#1111111";
const defaultBorder = "rgba(255,255,255, .1)";

let board = [];
for (let currentRow = 0; currentRow < ROW; currentRow++) {
	board[currentRow] = []
  for (let currentCol = 0; currentCol < ROW; currentCol++) {
    board[currentRow][currentCol] = defaultColor;
  }
}

drawBoard();
