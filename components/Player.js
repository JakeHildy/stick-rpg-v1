class Player {
  constructor(x, y, radius, color, gameMap) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.moveFlags = { up: false, down: false, left: false, right: false };
    this.gameMap = gameMap;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    const moveAmount = 3;
    let dx = 0;
    let dy = 0;

    if (
      this.moveFlags.up &&
      this.gameMap.isWalkable(this.x, this.y - moveAmount, this.radius)
    ) {
      dy = -moveAmount;
    }
    if (
      this.moveFlags.down &&
      this.gameMap.isWalkable(this.x, this.y + moveAmount, this.radius)
    ) {
      dy = moveAmount;
    }
    if (
      this.moveFlags.left &&
      this.gameMap.isWalkable(this.x - moveAmount, this.y, this.radius)
    ) {
      dx = -moveAmount;
    }
    if (
      this.moveFlags.right &&
      this.gameMap.isWalkable(this.x + moveAmount, this.y, this.radius)
    ) {
      dx = moveAmount;
    }

    this.move(dx, dy);
  }

  handleKeydown(event) {
    switch (event.code) {
      case 'ArrowUp':
        this.moveFlags.up = true;
        break;
      case 'ArrowDown':
        this.moveFlags.down = true;
        break;
      case 'ArrowLeft':
        this.moveFlags.left = true;
        break;
      case 'ArrowRight':
        this.moveFlags.right = true;
        break;
      default:
    }
  }

  handleKeyup(event) {
    switch (event.code) {
      case 'ArrowUp':
        this.moveFlags.up = false;
        break;
      case 'ArrowDown':
        this.moveFlags.down = false;
        break;
      case 'ArrowLeft':
        this.moveFlags.left = false;
        break;
      case 'ArrowRight':
        this.moveFlags.right = false;
        break;
      default:
    }
  }
}

export default Player;
