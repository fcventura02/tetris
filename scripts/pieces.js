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
      for (let currentCol = 0; currentCol < this.activePiece.length; currentCol++) {
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
    this.unDraw();
    this.y++;
    this.draw();
  }
}
