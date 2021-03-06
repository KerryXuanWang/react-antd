import React from 'react';
import ReactDOM from 'react-dom';
import { Card, IProfile } from './Card';

it('It should mount', () => {
  const div = document.createElement('div');
  const profile = {} as IProfile;

  ReactDOM.render(<Card {...profile} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
