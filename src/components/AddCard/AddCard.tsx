import React, { FormEvent } from 'react';

import axios from 'axios';

import { Button, Input } from 'antd';

import './AddCard.scss';
import { IProfile } from '../Card/Card';

export interface IUserState {
  name: string;
}

export interface ISubmitProps {
  onSubmit: (res: IProfile) => void;
}

export class AddCard extends React.Component<ISubmitProps, IUserState> {
  state: IUserState = {
    name: '',
  };

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const resp = await axios.get<IProfile>(`https://api.github.com/users/${this.state.name}`);
    this.props.onSubmit(resp.data);

    this.setState({ name: '' });
  };

  handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ name: event.target.value });

  render(): JSX.Element {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          value={this.state.name}
          onChange={this.handleValueChange}
          placeholder="GitHub username"
          required={true}
        />
        <Button type="primary" style={{ marginLeft: '20px' }}>
          Add Card
        </Button>
      </form>
    );
  }
}
