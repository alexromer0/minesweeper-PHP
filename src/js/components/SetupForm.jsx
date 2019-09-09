import React from 'react';
import '../../styles/components/SetupForm.scss';

class SetupForm extends React.Component {
  render() {
    const { gameOptions } = this.props;
    const { onChange } = this.props;
    const { onClick } = this.props;
    return (
      <section className='config-form'>
        <div className='config-form__options'>
          <div>
            <label htmlFor='columns'>Columns</label>
            <input name='columns' id='columns' type='number' value={gameOptions.columns} onChange={onChange}/>
          </div>
          <div>
            <label htmlFor='rows'>Rows</label>
            <input name='rows' type='number' value={gameOptions.rows} onChange={onChange}/>
          </div>
          <div>
            <button className='btn-generate-board' type='button' id='btn-generate-board' onClick={onClick}>Generate Board</button>
          </div>
        </div>
      </section>
    );
  }
}

export default SetupForm;
