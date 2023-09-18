import Player from './components/Player.js';
import GameMap from './components/GameMap.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  // Initialize the player
  const gameMap = new GameMap(15, 20, 40);
  const player = new Player(400, 300, 20, 'blue', gameMap);

  function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the map
    gameMap.draw(ctx);

    // Update Positions
    player.update();

    // Draw player
    player.draw(ctx);

    // Continue the game loop
    requestAnimationFrame(gameLoop);
  }

  document.addEventListener('keydown', function (event) {
    player.handleKeydown(event);
  });
  document.addEventListener('keyup', function (event) {
    player.handleKeyup(event);
  });

  gameLoop();
});
