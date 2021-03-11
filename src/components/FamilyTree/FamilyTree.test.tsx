import React from 'react';
import ReactDOM from 'react-dom';
import FamilyTree from './FamilyTree';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FamilyTree />, div);
  ReactDOM.unmountComponentAtNode(div);
});
