function drawBoard() {
  for (let currentRow = 0; currentRow < ROW; currentRow++) {
    for (let currentCol = 0; currentCol < ROW; currentCol++) {
      const currentSquareColor = board[currentRow][currentCol];
      drawSquare(currentRow, currentCol, currentSquareColor);
    }
  }
}

function drawSquare(y, x, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
  if (color === defaultColor) {
    ctx.strokeStyle = defaultBorder;
  }

	ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}
