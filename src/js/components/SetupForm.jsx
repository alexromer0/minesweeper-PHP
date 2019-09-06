import React from 'react';
import '../../styles/components/SetupForm.scss';

class SetupForm extends React.Component {

  render() {
    return (
      <section className="config-form">
        <div className="config-form__options">
          <div>
            <label htmlFor="columns">Columns</label><input name="columns" type="number" value={this.props.gameOptions.columns} onChange={this.props.onChange}/>
          </div>
          <div>
            <label htmlFor="rows">Rows</label><input name="rows" type="number" value={this.props.gameOptions.rows} onChange={this.props.onChange}/>
          </div>
          <div>
            <button className="btn-generate-board" id="btn-generate-board" onClick={this.props.onClick}>Generate Board</button>
          </div>
        </div>
      </section>
    );
  }
}

export default SetupForm;
