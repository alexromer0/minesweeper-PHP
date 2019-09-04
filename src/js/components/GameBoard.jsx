import React from 'react';
import BoardCell from './BoardCell';

const GameBoard = props => {
  const bombs = props.bombs;
  const rows = props.rows;
  const columns = props.columns;
  const bombExploded = false;
  const gameArray = _generateRandomArray(columns, rows, bombs);

  return (
    <div className="game-board">
    </div>
  );

};

const _generateRandomArray = (cols, rows, bombs) => {
  let arr = new Array(rows);
  let bombs_counter = 0;
  let pos = 1;
  let rand_val = 0;
  for (let i = 0; i <= rows - 1; i++) {
    arr[i] = new Array(cols);
    for (let k = 0; k <= cols - 1; k++) {
      if (bombs_counter < bombs) {
        // Check if there ara enough squares, if not put bombs in the rest of the squares
        if (((cols * rows) - pos) < (bombs - bombs_counter)) {
          rand_val = 1;
        } else {
          // Generate random bombs
          let randFactor = (parseInt(cols) + parseInt(rows)) - parseInt(bombs) + 2;
          let rand = Math.floor(Math.random() * randFactor);
          rand_val = rand === 1 ? 1 : 0;
        }
        bombs_counter += rand_val;
        arr[i][k] = rand_val;
      } else {
        arr[i][k] = 0;
      }
      pos++;
    }
    // Shuffle the array
    _shuffle(arr[i]);
  }
  return arr;
};

const _shuffle = (a) => {
  let j,
    x,
    i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
};

export default GameBoard;
