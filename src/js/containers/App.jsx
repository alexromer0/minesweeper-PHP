import React from 'react';
import '../../styles/index.scss';
import Header from '../components/Header';
import MinesweeperGame from '../components/MinesweeperGame';

const App = () => {

  return (
    <div className='Game'>
      <Header/>
      <MinesweeperGame/>
    </div>
  );
};

export default App;
