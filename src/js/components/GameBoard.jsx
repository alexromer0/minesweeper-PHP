import React from 'react';
import '../../styles/components/GameBoard.scss';
import BoardCell from './BoardCell';

class GameBoard extends React.Component {

  render() {
    const { contentArray } = this.props;
    let key = 0;
    return (
      <div className='game-board'>
        <div className='game-board__container'>
          {contentArray.map((val, index) => {
            return (
              <div className='board-row'>
                {val.map((val, ind) => {
                  key++;
                  return <BoardCell key={key}/>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

}

export default GameBoard;
