const matrix = [
  [5, 8, 6, 0, 7, 0, 0, 0, 0],
  [0, 0, 0, 9, 0, 1, 6, 0, 0],
  [0, 0, 0, 6, 0, 0, 0, 0, 0],
  [0, 0, 7, 0, 0, 0, 0, 0, 0],
  [9, 0, 2, 0, 1, 0, 3, 0, 5],
  [0, 0, 5, 0, 9, 0, 0, 0, 0],
  [0, 9, 0, 0, 4, 0, 0, 0, 8],
  [0, 0, 3, 5, 0, 0, 0, 6, 0],
  [0, 0, 0, 0, 2, 0, 4, 7, 0],
];

const isPossible = (x, y, n, grid) => {
  // if the cell is not empty at x, y position then we return false
  if (grid[x][y] !== 0) {
    return false;
  }

  // check if n exists in the row already
  for (let i = 0; i < 9; i++) {
    if (grid[x][i] === n) {
      return false;
    }
  }

  // check if n exists in the column
  for (let i = 0; i < 9; i++) {
    if (grid[i][y] === n) {
      return false;
    }
  }

  // check if n exists in the small 3 x 3 square
  // row wise lower bound
  let rlb = Math.floor(x / 3) * 3;
  let clb = Math.floor(y / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[rlb + i][clb + j] === n) {
        return false;
      }
    }
  }

  // return true if all 3 validation passed
  return true;
};

const solveGrid = (grid) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // check if grid is empty at i, j position
      if (grid[i][j] === 0) {
        for (let k = 1; k < 10; k++) {
          if (isPossible(i, j, k, grid)) {
            grid[i][j] = k;
            let newGrid = solveGrid(grid);
            // if current choice of value k is incorrect
            // then subsequent solveGrid function call
            // will return false, in that case we nullify
            // the current choice and look for other solution
            if (newGrid) {
              return newGrid;
            }
            grid[i][j] = 0;
          }
        }

        // when no number is possible then return false
        // so that previous choice can be nullified
        return false;
      }
    }
  }

  // if no position in the grid is empty then return the grid
  return grid;
};

console.log(matrix);
console.log();
console.log(solveGrid(matrix));
