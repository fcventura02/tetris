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

function randomPiece() {
  const randomPieceNumber = Math.floor(Math.random() * PIECES.length);
  return new Piece(PIECES[randomPieceNumber][0], PIECES[randomPieceNumber][1]);
}

function drop() {
  const now = Date.now();
  const delta = now - dropStart;

  if (delta > speed) {
    piece.moveDow();
    dropStart = Date.now();
  }

  requestAnimationFrame(drop);
}
