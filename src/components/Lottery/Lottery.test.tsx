import React from 'react';
import ReactDOM from 'react-dom';
import Lottery from './Lottery';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Lottery />, div);
  ReactDOM.unmountComponentAtNode(div);
});