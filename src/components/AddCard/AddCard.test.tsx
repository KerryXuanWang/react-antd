import React from 'react';
import ReactDOM from 'react-dom';
import AddCard from './AddCard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});