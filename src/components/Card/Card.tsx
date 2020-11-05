import React from 'react';
import './Card.scss';

export interface IProfile {
  id: string;
  avatar_url: string;
  name: string;
  company: string;
}

export const Card: React.FC<IProfile> = (props: IProfile) => (
  <div className="github-profile">
    <img alt={props.name} src={props.avatar_url} />
    <div className="info">
      <div className="name">{props.name}</div>
      <div className="company">{props.company}</div>
    </div>
  </div>
);
