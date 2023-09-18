class GameMap {
  constructor(rows, cols, cellSize) {
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;
    this.grid = this.createGrid();
  }

  createGrid() {
    const grid = new Array(this.rows);
    for (let row = 0; row < this.rows; row++) {
      grid[row] = new Array(this.cols);
      for (let col = 0; col < this.cols; col++) {
        // Add walls at the edges of the map
        if (
          row === 0 ||
          row === this.rows - 1 ||
          col === 0 ||
          col === this.cols - 1
        ) {
          grid[row][col] = 'W';
        } else {
          // Everything else is walkable for now
          grid[row][col] = ' ';
        }
      }
    }

    // Add some additional walls for complexity
    grid[5][5] = 'W';
    grid[5][6] = 'W';
    grid[6][5] = 'W';
    grid[6][6] = 'W';

    console.log(grid);

    return grid;
  }

  draw(ctx) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        ctx.beginPath();
        ctx.rect(
          col * this.cellSize,
          row * this.cellSize,
          this.cellSize,
          this.cellSize,
        );
        if (this.grid[row][col] === 'W') {
          // Draw wall
          ctx.fillStyle = 'black';
        } else {
          // Draw floor
          ctx.fillStyle = 'white';
        }
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  isWalkable(x, y, radius) {
    const gridX = Math.floor(x / this.cellSize);
    const gridY = Math.floor(y / this.cellSize);

    const gridX1 = Math.floor((x - radius) / this.cellSize);
    const gridX2 = Math.floor((x + radius) / this.cellSize);
    const gridY1 = Math.floor((y - radius) / this.cellSize);
    const gridY2 = Math.floor((y + radius) / this.cellSize);

    // Check for out-of-bounds positions
    if (
      gridX < 0 ||
      gridY < 0 ||
      gridX >= this.cols ||
      gridY >= this.rows ||
      gridX1 < 0 ||
      gridY1 < 0 ||
      gridX1 >= this.cols ||
      gridY1 >= this.rows ||
      gridX2 < 0 ||
      gridY2 < 0 ||
      gridX2 >= this.cols ||
      gridY2 >= this.rows
    ) {
      return false;
    }

    // Check if any of the boundary points of the circle collide with a wall
    return (
      this.grid[gridY][gridX] !== 'W' &&
      this.grid[gridY1][gridX1] !== 'W' &&
      this.grid[gridY1][gridX2] !== 'W' &&
      this.grid[gridY2][gridX1] !== 'W' &&
      this.grid[gridY2][gridX2] !== 'W'
    );
  }
}

export default GameMap;
