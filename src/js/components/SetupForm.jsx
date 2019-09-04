import React from 'react';
import '../../styles/components/SetupForm.scss';

const SetupForm = () => (
    <section className="config-form">
      <div>
        <label htmlFor="columns">Columns</label><input id="columns" type="number"/>
      </div>
      <div>
        <label htmlFor="rows">Rows</label><input id="rows" type="number"/>
      </div>
      <div>
        <button className="btn-generate-board">Generate Board</button>
      </div>
    </section>
);

export default SetupForm;
