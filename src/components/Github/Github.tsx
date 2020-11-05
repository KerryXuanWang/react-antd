import React from 'react';

import './Github.scss';

import { CardList } from '../CardList/CardList';
import { IProfile } from '../Card/Card';
import { AddCard } from '../AddCard/AddCard';

interface IGithubState {
  title: string;
  profiles: IProfile[];
}

export default class Github extends React.Component<{}, IGithubState> {
  state: IGithubState = {
    title: 'The Github Cards App',
    profiles: [],
  };

  addUser = (profile: IProfile) => {
    this.setState((prevState: IGithubState) => ({
      profiles: [...prevState.profiles, profile],
    }));
  };

  render(): JSX.Element {
    return (
      <React.Fragment>
        <div className="header">{this.state.title}</div>
        <AddCard onSubmit={this.addUser} />
        <CardList profiles={this.state.profiles} />
      </React.Fragment>
    );
  }
}
