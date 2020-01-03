import { gridSize } from './globals.js';

let snake = kontra.Sprite({
  x: 160,
  y: 160,

  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: gridSize,
  dy: 0,

  // keep track of all grids the snake body occupies
  cells: [],

  // length of the snake. grows when eating an apple
  maxCells: 4,

  update() {
    this.advance();
    let canvas = kontra.getCanvas();

    // wrap snake position horizontally on edge of screen
    if (this.x < 0) {
      this.x = canvas.width - gridSize;
    }
    else if (this.x >= canvas.width) {
      this.x = 0;
    }

    // wrap snake position vertically on edge of screen
    if (this.y < 0) {
      this.y = canvas.height - gridSize;
    }
    else if (this.y >= canvas.height) {
      this.y = 0;
    }

    // keep track of where snake has been. front of the array is always the head
    this.cells.unshift({x: this.x, y: this.y});

    // remove cells as we move away from them
    if (this.cells.length > this.maxCells) {
      this.cells.pop();
    }
  },

  render() {
    this.context.fillStyle = 'green';
    snake.cells.forEach((cell, index) => {

      // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
      this.context.fillRect(cell.x, cell.y, gridSize-1, gridSize-1);
    });
  }
});

// prevent snake from backtracking on itself by checking that it's
// not already moving on the same axis (pressing left while moving
// left won't do anything, and pressing right while moving left
// shouldn't let you collide with your own body)
kontra.bindKeys('left', () => {
  if (snake.dx === 0) {
    snake.dx = -gridSize;
    snake.dy = 0;
  }
});
kontra.bindKeys('up', () => {
  if (snake.dy === 0) {
    snake.dy = -gridSize;
    snake.dx = 0;
  }
});
kontra.bindKeys('right', () => {
  if (snake.dx === 0) {
    snake.dx = gridSize;
    snake.dy = 0;
  }
});
kontra.bindKeys('down', () => {
  if (snake.dy === 0) {
    snake.dy = gridSize;
    snake.dx = 0;
  }
});

export default snake;