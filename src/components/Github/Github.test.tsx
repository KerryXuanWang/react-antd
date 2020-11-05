import React from 'react';
import ReactDOM from 'react-dom';
import Github from './Github';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Github />, div);
  ReactDOM.unmountComponentAtNode(div);
});
