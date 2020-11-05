import React from 'react';
import './CardList.scss';

import { IProfile, Card } from '../Card/Card';

export interface ICardList {
  profiles: IProfile[];
}

export const CardList: React.FC<ICardList> = ({ profiles }) => {
  return (
    <div>
      {profiles.map((profile) => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
};
