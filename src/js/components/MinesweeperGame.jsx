import React from 'react';
import SetupForm from './SetupForm';
import GameBoard from './GameBoard';

class MinesweeperGame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      board: {
        bombs: 0,
        columns: 5,
        rows: 5,
      },
      game: {
        boardContent: [],
        ready: false,
      },
    };
  }

  handleInputChange = (evnt) => {
    const { board } = this.state;
    this.setState({
      board: {
        ...board,
        [evnt.target.name]: evnt.target.value,
      },
    });
  };

  handleCreateGameClick = () => {
    const states = this.state;
    const bombsMax = Math.ceil((states.board.rows * states.board.columns) * 0.65);
    const bombsMin = Math.ceil((states.board.rows * states.board.columns) * 0.25);
    const bombs = this._getRandomInteger(bombsMin, bombsMax);
    this._startNewGame(states.board.columns, states.board.rows, bombs);
  };

  _getRandomInteger = (min, max) => {
    let result = Math.floor(Math.random() * Math.floor(max));
    if (result < min) {
      result = this._getRandomInteger(min, max);
    }
    return result;
  };

  _startNewGame = (cols, rows, bombs) => {
    const { game } = this.state;

    if ((rows >= 5 && rows <= 15) && (cols >= 5 && cols <= 15)) {
      this.setState({
        game: {
          ...game,
          boardContent: this._generateRandomArray(cols, rows, bombs),
          ready: true,
        },
      });
      //this.resBoard = this._createResBoard();
    } else {
      throw 'The rows and columns number must be between 5 and 10';
    }
  };

  _generateRandomArray(cols, rows, bombs) {
    const arr = new Array(rows);
    let bombsCounter = 0;
    let pos = 1;
    let randVal = 0;
    for (let i = 0; i <= rows - 1; i++) {
      arr[i] = new Array(cols);
      for (let k = 0; k <= cols - 1; k++) {
        if (bombsCounter < bombs) {
          // Check if there ara enough squares, if not put bombs in the rest of the squares
          if (((cols * rows) - pos) < (bombs - bombsCounter)) {
            randVal = 1;
          } else {
            // Generate random bombs
            const randFactor = (parseInt(cols, 10) + parseInt(rows, 10)) - parseInt(bombs, 10) + 2;
            const rand = Math.floor(Math.random() * randFactor);
            randVal = rand === 1 ? 1 : 0;
          }
          bombsCounter += randVal;
          arr[i][k] = randVal;
        } else {
          arr[i][k] = 0;
        }
        pos++;
      }
      // Shufle the array
      arr[i] = this._arrayShuffle(arr[i]);
    }
    return arr;
  }

  _arrayShuffle = (arr) => {
    let j,
      x,
      i;
    const res = [];

    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      res[i] = arr[j];
      res[j] = x;
    }
    return res;
  };

  render() {
    const { board } = this.state;
    const { game } = this.state;
    return (
      <>
        <SetupForm onChange={this.handleInputChange} onClick={this.handleCreateGameClick} gameOptions={board}/>
        {game.ready ? <GameBoard contentArray={game.boardContent}/> : null}
      </>
    );
  }
}

export default MinesweeperGame;
