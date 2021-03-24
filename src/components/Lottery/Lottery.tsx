import React, { useState, useEffect } from 'react';

import { getCurrentTime } from '../TrafficLight/TrafficLight';

import './Lottery.scss';

export interface ILottery {
  value: string;
  active: boolean;
  index: number;
}

let DURATION = 15 * 1000;

function generateData() {
  const goods = [
    'Ear Phone',
    'iPad',
    'Car',
    'Shoes',
    'Start',
    'Jacket',
    'Mac Book Pro',
    'House',
    'Beauty',
  ];
  const res: ILottery[] = goods.map((v, i) => {
    return {
      index: i,
      active: false,
      value: v,
    };
  });

  return res;
}

const loopMapping = {
  0: 0,
  1: 1,
  2: 2,
  3: 5,
  4: 8,
  5: 7,
  6: 6,
  // 7: 4, // no need to loop start
  8: 3,
};

const Lottery: React.FC = () => {
  const [data, setData] = useState(generateData());
  const [disabled, setDisabled] = useState(false);

  let startTime: number;

  function start() {
    DURATION = ((15 - 5) * Math.random() + 5) * 1000;
    startTime = getCurrentTime();
    loop();
    setDisabled(true);
  }

  function loop(currentIndex: number = 0) {
    const now = getCurrentTime();
    const difference = now - startTime;
    if (difference >= DURATION) {
      setDisabled(false);
      return;
    }

    if (currentIndex > 8) {
      currentIndex = 0;
    }

    const newData = generateData();
    const target = loopMapping[currentIndex];

    currentIndex++;

    if (!newData[target]) {
      setTimeout(() => loop(currentIndex), 0);
      return;
    }

    newData[target].active = true;
    setData([...newData]);

    if (DURATION - difference > DURATION / 2) {
      setTimeout(() => loop(currentIndex), 100);
    } else if (DURATION - difference > DURATION / 8) {
      setTimeout(() => loop(currentIndex), 400);
    } else {
      setTimeout(() => loop(currentIndex), 1000);
    }
  }

  return (
    <div className="Lottery">
      <div className="container">
        {data.map((v, i) => {
          return (
            <div className={v.active ? 'item active' : 'item'} key={v.index}>
              {i !== 4 ? (
                v.value
              ) : (
                <button
                  className="ant-btn ant-btn-primary ant-btn-lg"
                  disabled={disabled}
                  onClick={() => start()}
                >
                  {v.value}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lottery;
