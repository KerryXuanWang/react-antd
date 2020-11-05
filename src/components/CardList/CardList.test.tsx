import React from 'react';
import ReactDOM from 'react-dom';
import CardList from './CardList';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CardList />, div);
  ReactDOM.unmountComponentAtNode(div);
});