function drawBoard() {
  for (let currentRow = 0; currentRow < ROW; currentRow++) {
    for (let currentCol = 0; currentCol < ROW; currentCol++) {
      const currentSquareColor = board[currentRow][currentCol];
      drawSquare(currentRow, currentCol, currentSquareColor);
    }
  }

  for (let currentRow = 0; currentRow < previewRow; currentRow++) {
    for (let currentCol = 0; currentCol < previewCol; currentCol++) {
      const currentSquareColor = previewBoard[currentRow][currentCol];
      previewDrawSquare(currentRow, currentCol, currentSquareColor);
    }
  }

  scoreElement.innerText = score;
  speedElement.innerText = speed;
}

function drawSquare(y, x, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
  if (color === defaultColor) {
    ctx.strokeStyle = defaultBorder;
  }

  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

function previewDrawSquare(y, x, color) {
  previewPieceCtx.fillStyle = color;
  previewPieceCtx.fillRect(x * SQ, y * SQ, SQ, SQ);
  if (color === "#333") {
    previewPieceCtx.strokeStyle = "rgba(255,255,255,0)";
  }

  previewPieceCtx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

function randomPiece() {
  const randomPieceNumber = Math.floor(Math.random() * PIECES.length);
  return new Piece(PIECES[randomPieceNumber][0], PIECES[randomPieceNumber][1]);
}

function drop() {
  const now = Date.now();
  const delta = now - dropStart;
  if (delta > speed) {
    nextPiece.preview();
    piece.moveDow();
    dropStart = Date.now();
  }
  if (!isGameOver) {
    animation = requestAnimationFrame(drop);
  } else {
    cancelAnimationFrame(animation);
  }
}

function control(event) {
  if (!canMove) {
    return false;
  }
  try {
    const moveFunctions = {
      ArrowLeft() {
        piece.moveLeft();
        dropStart = Date.now();
      },
      ArrowRight() {
        piece.moveRight();
        dropStart = Date.now();
      },
      ArrowUp() {
        piece.rotate();
        dropStart = Date.now();
      },
      ArrowDown() {
        piece.moveDow();
      },
      Enter() {
        document.getElementById("modal").classList.remove("open");
        document.getElementById("modal").classList.add("close");
        window.setTimeout(() => drop(), 1000);
      },
    };
    const movePiece = moveFunctions[event.code];
    movePiece();
  } catch (error) {}
}

function updateRowAndScore(row) {
  canMove = false;
  for (let y = row; y > 1; y--) {
    for (let currentCol = 0; currentCol < COL; currentCol++) {
      board[y][currentCol] = board[y - 1][currentCol];
    }
  }

  for (let currentCol = 0; currentCol < COL; currentCol++) {
    board[0][currentCol] = defaultColor;
  }
  score += 10;
  if (speed > 100) {
    speed -= 20;
  }
  canMove = true;
}

function gameOver() {
  modal.classList.add("open");
  modal.classList.remove("close");
  modal.childNodes[1].style.display = "none";
  modal.childNodes[3].style.display = "flex";
  document.getElementById("score-result").innerText = score;
  isGameOver = true;

  document
    .getElementById("resetGame")
    .addEventListener("click", () => resetGame());
}

function resetGame() {
  modal.classList.remove("open");
  modal.classList.add("close");
  speed = 500;
  dropStart = Date.now();
  score = 0;
  isGameOver = false;

  board = [];
  for (let currentRow = 0; currentRow < ROW; currentRow++) {
    board[currentRow] = [];
    for (let currentCol = 0; currentCol < COL; currentCol++) {
      board[currentRow][currentCol] = defaultColor;
    }
  }
  nextPiece = randomPiece();
  piece = randomPiece();
  drawBoard();
  drop();
}
