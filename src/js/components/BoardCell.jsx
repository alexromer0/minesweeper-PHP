import React from 'react';
import '../../styles/components/BoardCell.scss';

class BoardCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUnrevealed: true
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isUnrevealed: !state.isUnrevealed
    }));
  }

  render() {
    return (
      <div className="game-board__cell" onClick={this.handleClick}>
        {this.state.isUnrevealed ? ':)' : ':('}
      </div>
    );
  }
}

export default BoardCell;
