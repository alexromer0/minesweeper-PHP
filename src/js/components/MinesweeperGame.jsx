import React from 'react';
import SetupForm from './SetupForm';
import GameBoard from './GameBoard';

class MinesweeperGame extends React.Component {
  state = {
    board: {
      bombs: 0,
      columns: 5,
      rows: 5
    },
    game: {
      boardContent: [],
      ready: false
    }
  };

  handleInputChange = (evnt) => {
    this.setState({
      board: {
        ...this.state.board,
        [evnt.target.name]: evnt.target.value
      }
    });
  };

  handleCreateGameClick = () => {
    const rows = this.state.board.rows;
    const cols = this.state.board.columns;
    const bombsMax = Math.ceil((rows * cols) * 0.65);
    const bombsMin = Math.ceil((rows * cols) * 0.25);
    const bombs = this._getRandomInteger(bombsMin, bombsMax);
    this._startNewGame(cols, rows, bombs);

    // board = new Board(x, y, bombs);
    // game = new Game(board);
    // flags = 0;
    // totalSeconds = 0;
    // stopTimer();
    // var boardTitle = $('#board-title');
    // var tHead = '<tr><th class="board-title" colspan="' + x + '"><span id="bombs-counter" class="bombs-counter">' + bombs + '</span> | <span id="seconds">00</span></th></tr>';
    // boardTitle.empty();
    // boardTitle.append(tHead);
    // game.printBoard(game.voard.getGameBoard());
  };

  _getRandomInteger = (min, max) => {
    let result = Math.floor(Math.random() * Math.floor(max));
    if (result < min) {
      result = this._getRandomInteger(min, max);
    }
    return result;
  };

  _startNewGame = (cols, rows, bombs) => {
    if ((rows >= 5 && rows <= 15) && (cols >= 5 && cols <= 15)) {
      this.setState({
        game: {
          ...this.state.game,
          boardContent: this._generateRandomArray(cols, rows, bombs),
          ready: true
        }
      });
      //this.resBoard = this._createResBoard();
    } else {
      throw 'The rows and columns number must be between 5 and 10';
    }
  };

  _generateRandomArray(cols, rows, bombs) {
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
      // Shufle the array
      this._arrayShuffle(arr[i]);
    }
    return arr;
  }

  _arrayShuffle = (arr) => {
    let j,
      x,
      i;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }
  };

  render() {
    return (
      <>
        <SetupForm onChange={this.handleInputChange} onClick={this.handleCreateGameClick} gameOptions={this.state.board}/>
        {this.state.game.ready ? <GameBoard contentArray={this.state.game.boardContent}/> : null}
      </>
    );
  }
}

export default MinesweeperGame;
