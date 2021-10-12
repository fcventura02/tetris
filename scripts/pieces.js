class Piece {
  constructor(piece, color) {
    this.piece = piece;
    this.color = color;

    this.pieceN = 0;
    this.activePiece = this.piece[this.pieceN];

    this.x = 3;
    this.y = -2;
  }

  fill(color) {
    for (
      let currentRow = 0;
      currentRow < this.activePiece.length;
      currentRow++
    ) {
      for (
        let currentCol = 0;
        currentCol < this.activePiece.length;
        currentCol++
      ) {
        if (this.activePiece[currentRow][currentCol]) {
          drawSquare(this.y + currentRow, this.x + currentCol, color);
        }
      }
    }
  }
  draw() {
    this.fill(this.color);
  }

  unDraw() {
    this.fill(defaultColor);
  }

  moveDow() {
    if (!this.collision(0, 1, this.activePiece)) {
      this.unDraw();
      this.y++;
      this.draw();
      return;
    }
    this.lok();
    piece = randomPiece();
  }

  collision(x, y, futurePiece) {
    for (let currentRow = 0; currentRow < futurePiece.length; currentRow++) {
      for (let currentCol = 0; currentCol < futurePiece.length; currentCol++) {
        if (!futurePiece[currentRow][currentCol]) continue;

        let newX = this.x + currentCol + x;
        let newY = this.y + currentRow + y;

        if (newX < 0 || newX >= COL || newY >= ROW) return true;
        if (newY < 0) continue;
        if (board[newY][newX] != defaultColor) return true;
      }
    }
    return false;
  }

  lok() {
    for (
      let currentRow = 0;
      currentRow < this.activePiece.length;
      currentRow++
    ) {
      for (
        let currentCol = 0;
        currentCol < this.activePiece.length;
        currentCol++
      ) {
        if (!this.activePiece[currentRow][currentCol]) continue;

        if (this.y + currentRow < 0) break;

        board[this.y + currentRow][this.x + currentCol] = this.color;
      }
    }
  }
}
