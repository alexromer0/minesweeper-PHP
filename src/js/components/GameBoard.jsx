import React from 'react';
import '../../styles/components/GameBoard.scss';
import BoardCell from './BoardCell';

class GameBoard extends React.Component {

  render() {
    return (
      <div className="game-board">
        <div className="game-board__container">
          {this.props.contentArray.map((val, index) => {
              return <div className="board-row">
                {val.map((val, index) => {
                  return <BoardCell key={index}/>;
                })}</div>;
            }
          )}
        </div>
      </div>
    );
  }

}

export default GameBoard;
